/**
 * PlaylistController
 *
 * @description :: Server-side logic for managing Playlists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var GS  = require('machinepack-grooveshark');
var Zip = require('machinepack-zip');

module.exports = {

  downloadPlaylistSafe: function(req, res){
    var params = req.validator([{playlist: 'string'}]);
    if(!params) return null;
    var user = req.session.user;
    params.path = Globals.path + '/' +  user + '/' + params.playlist;

    Playlist.create({groovesharkId: params.playlist, user: user})
    .exec(function(err, playlist){
      if(err) return res.serverError(err);

      GS.downloadPlaylistSave({
        id  : params.playlist,
        path: params.path
      }).exec({

        error: function (err){
          Playlist.update(playlist.id, {state: 'unknow error'}).exec(function(){});
        },

        notFound: function (){
          Playlist.update(playlist.id, {state: 'not found'}).exec(function(){});
        },

        downloadLimitExceded: function (){
          Playlist.update(playlist.id, {state: 'banned'}).exec(function(){});
        },

        success: function (){
          var destination = params.path + '.zip';
          return _compressAndSendLink(params.path, destination, playlist.id, user);
        }

      });

      return res.ok();

    });

  },

  downloadZip: function(req, res){
    Playlist.findOne({token: req.param('token')}).exec(function(err, playlist){
      if(err) return res.serverError();
      if(!playlist) return res.notFound();

      var fs = require('fs');
      if(!fs.existsSync(playlist.zipUrl)) return res.notFound();
      var stat = fs.statSync(playlist.zipUrl);
      res.writeHead(200, {
        'Content-Type'       : 'application/zip, application/octet-stream',
        'Content-Length'     : stat.size,
        'Content-disposition': 'attachment; filename=' + playlist.groovesharkId + '.zip'
      });

      var stream = fs.createReadStream(playlist.zipUrl);
      stream.pipe(res);
      stream.on('end', function(){
        fs.unlink(playlist.zipUrl, function(err){
          if(err) sails.log.error('Error removing zipUrl: ', playlist.zipUrl);
          Playlist.update(playlist.id, {state: 'completed'}).exec(function(){});
        });
      });
    });
  }

};

var _compressAndSendLink = function(source, destination, playlist, user){
  Zip.zip({
    sources: [source],
    destination: destination,
  }).exec({

    error: function (err){
      sails.log.error('Error Zipping');
    },

    success: function (result){
      return _removeSongs(source, destination, playlist, user);
    }

  });
};

var _removeSongs = function(source, destination, playlist, user){
  Playlist.update(playlist, {state: 'ready', zipUrl: destination})
  .exec(function(err, playlist){
    require('fs-extra').remove(source, function(err) {
      if (err) return sails.log.error(err);
    })
  });
};

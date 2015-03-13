/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var GS  = require('machinepack-grooveshark');

module.exports = {

  getSong: function(req, res){
    var params = req.validator([{name: 'string', artist: 'string'}]);
    if(!params) return null;
    params.path = Globals.path + '/' +  req.session.user;

    GS.downloadSongByNameAndArtist({
      name  : params.name,
      artist: params.artist,
      path  : params.path
    }).exec({

      error: function (err){
        return res.send(400, err);
      },

      notFound: function (){
        return res.notFound();
      },

      downloadLimitExceded: function (){
        return res.forbidden('Download limit exceded');
      },

      success: function (songUrl){
        var song = {
          user  : req.session.user,
          name  : params.name,
          artist: params.artist,
          url   : songUrl
        };
        Song.create(song).exec(function(err, song){
          if(err || !song) return res.serverError();
          delete song.url;
          return res.ok(song);
        });
      }

    });
  },

  downloadSong: function(req, res){
    Song.findOne({token: req.param('token')}).exec(function(err, song){
      if(err) return res.serverError(err);
      if(!song) return res.notFound();
      if(song.user !== req.session.user) return res.forbidden();
      return _downloadSong(res, song);
    });
  }

};

var _downloadSong = function(res, song){
  var fs = require('fs');
  var stat = fs.statSync(song.url);
  res.writeHead(200, {
    'Content-Type'       : 'audio/mpeg',
    'Content-Length'     : stat.size,
    'Content-disposition': 'attachment; filename=' + song.name + '.mp3'
  });

  var stream = fs.createReadStream(song.url);
  stream.pipe(res);
  stream.on('end', function(){
    fs.unlink(song.url, function(err){
      if(err) sails.log.error('Error removing song: ', song.name);
    });
  });
};

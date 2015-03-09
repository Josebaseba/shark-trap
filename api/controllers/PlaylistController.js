/**
 * PlaylistController
 *
 * @description :: Server-side logic for managing Playlists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var GS  = require('machinepack-grooveshark');
var Zip = require('machinepack-zip');

module.exports = {

	downloadSong: function(req, res){
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

			success: function (song){
				var fs = require('fs');
				var stat = fs.statSync(song);
		    res.writeHead(200, {
	        'Content-Type'       : 'audio/mpeg',
	        'Content-Length'     : stat.size,
					'Content-disposition': 'attachment; filename=' + params.name + '.mp3'
		    });

		    var stream = fs.createReadStream(song);
		    stream.pipe(res);
				stream.on('end', function(){
					fs.unlink(song, function(err){
						if(err) sails.log.error('Error removing song: ', song);
					});
				});
			}

		});
	},

	dowloadPlaylistSafe: function(req, res){
		var params = req.validator([{playlist: 'string'}]);
		if(!params) return null;
		var user = req.session.user;
		params.path = Globals.path + '/' +  user + '/' + playlist;

		GS.downloadPlaylistSave({
			id  : params.playlist,
			path: path
		}).exec({

			error: function (err){
				sails.log.error('Playlist Error:', err);
				// TODO: Send email with the error
			},

			notFound: function (){
				var id = req.session.user;
				sails.sockets.emit(id, 'playlistNotFound', {err: 'Playlist not found'});
			},

			downloadLimitExceded: function (){
				sails.log.error('Error: Not found playlist');
				var id  = req.session.user;
				var err = 'Download size exceded, please try again later';
				sails.sockets.emit(id, 'downloadExceded', {err: 'Playlist not found'});
			},

			success: function (){
				var destination = params.path + '.zip';
				return _compressAndSendLink(params.path, destination, playlist, user);
			}

		});
	}

};

var _compressAndSendLink = function(souce, destination, playlist, user){
	Zip.zip({
		sources: [source],
		destination: destination,
	}).exec({

		error: function (err){
			var id  = req.session.user;
			sails.sockets.emit(id, 'zipError', {err: 'Error compressing'});
			//TODO: Send email
			sails.log.error('Error Zipping');
		},

		success: function (result){
			var id  = req.session.user;
			sails.sockets.emit(id, 'playlistDownloaded', {link: destination});
			return _removeSongs(source, playlist, user);
		}

	});
};

var _removeSongs = function(source, playlist, user){
	Playlist.update({groovesharkId: playlist, user: user}, state.completed)
	.exec(function(err, playlist){
		require('fs-extra').remove(source, function(err) {
		  if (err) return console.error(err);
		})
	});
};

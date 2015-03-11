$(function(){

  var Router = {};

  var startHomeRouter = function(){

    Router = Backbone.Router.extend({

      routes: {
        '!/login'        : 'showLoginModal',
        '!/invitation'   : 'showInvitationModal',
        '!/:unknow'      : 'showHome',
        '/:unknow'       : 'showHome',
        ':unknow'        : 'showHome'
      },

      showLoginModal: function(){
        Backbone.trigger('hideInvitationForm');
        Backbone.trigger('showLoginForm');
      },

      showInvitationModal: function(){
        Backbone.trigger('hideLoginForm');
        Backbone.trigger('showInvitationForm');
      },

      showHome: function(){
        this.navigate('!/', {trigger: true, replace: true});
      }

    });

  };

  var startAppRouter = function(){

    Router = Backbone.Router.extend({

      routes: {
        '!/'                 : 'showHome',
        '!/download-song'    : 'downloadSong',
        '!/download-playlist': 'downloadPlaylist',
        '!/playlists'        : 'showMyPlaylists',
        '!/profile'          : 'myProfile',
        '!/:unknow'          : 'addHash',
        '/:unknow'           : 'addHash',
        ':unknow'            : 'addHash'
      },

      addHash: function(){
        this.navigate('!/', {trigger: true, replace: true});
      },

      showHome: function(){
        Backbone.trigger('hideSections', 'home');
        Backbone.trigger('showHome');
      },

      downloadSong: function(){
        Backbone.trigger('hideSections', 'songs');
        Backbone.trigger('showDownloadSong');
      },

      downloadPlaylist: function(){
        Backbone.trigger('hideSections', 'playlist');
        Backbone.trigger('showDownloadPlaylist');
      },

      showMyPlaylists: function(){
        Backbone.trigger('hideSections', 'myPlaylists');
        Backbone.trigger('showMyPlaylists');
      },

      myProfile: function(){
        Backbone.trigger('hideSections', 'profile');
        Backbone.trigger('showMyProfile');
      }

    });

  };

  if(app.homepage) startHomeRouter(); else startAppRouter();

  app.router = new Router();
  Backbone.history.start();
  app.router.navigate('!/', {trigger: true, replace: true});

});

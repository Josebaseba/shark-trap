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
        app.router. navigate('!/', {trigger: true, replace: true});
      }

    });

  };

  var startAppRouter = function(){

    Router = Backbone.Router.extend({

      routes: {

      }

    });

  };

  if(app.homepage) startHomeRouter(); else startAppRouter();

  app.router = new Router();
  Backbone.history.start();

});

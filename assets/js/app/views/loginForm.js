$(function(){

  var LoginForm = Backbone.View.extend({

    el: $('fieldset[data-control=login]'),

    events: {
      'keypress input'    : 'keyPressed',
      'click input#login' : 'doLogin'
    },

    initialize: function(){
      if(!this.$el.length) return null;
      this.listenTo(Backbone, 'showLoginForm', this.showLoginForm);
      this.listenTo(Backbone, 'hideLoginForm', this.hideLoginForm);
      this.$email      = this.$('input[type=email]');
      this.$password   = this.$('input[type=password]');
      this.$loginError = this.$('div.error-msg');
    },

    showLoginForm: function(){
      this.$el.removeClass('hidden');
    },

    hideLoginForm: function(){
      this.$el.addClass('hidden');
    },

    // USER EVENTS

    keyPressed: function(event){
      if(event.keyCode === 13) return this.doLogin();
    },

    doLogin: function(){
      this.$loginError.addClass('no-visibility');
      var data = {
        email   : this.$email.val(),
        password: this.$password.val()
      };
      app.proxy('POST', '/login', data, this.successLogin, this.loginError, this);
    },

    // MAIN EVENTS

    successLogin: function(){
      document.location = '/';
    },

    loginError: function(err){
      this.$loginError.removeClass('no-visibility');
    }

  });

  var loginForm = new LoginForm();

});

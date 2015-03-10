$(function(){

  var LoginForm = Backbone.View.extend({

    el: $('fieldset[data-control=login]'),

    events: {

    },

    initialize: function(){
      if(!this.$el.length) return null;
      this.listenTo(Backbone, 'showLoginForm', this.showLoginForm);
      this.listenTo(Backbone, 'hideLoginForm', this.hideLoginForm);
    },

    showLoginForm: function(){
      this.$el.removeClass('hidden');
    },

    hideLoginForm: function(){
      this.$el.addClass('hidden');
    }

  });

  var loginForm = new LoginForm();

});

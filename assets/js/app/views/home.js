$(function(){

  var Home = Backbone.View.extend({

    el: $('section#home'),

    events: {

    },

    initialize: function(){
      this.listenTo(Backbone, 'showHome', this.showHome);
    },

    showHome: function(){
      this.$el.removeClass('hidden');
    }

  });

  var home = new Home();


});

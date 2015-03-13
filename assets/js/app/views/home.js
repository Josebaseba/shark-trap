$(function(){

  var Home = Backbone.View.extend({

    el: $('section#home'),

    events: {

    },

    initialize: function(){
      this.listenTo(Backbone, 'hideSections', this.hideSections);
      this.listenTo(Backbone, 'showHome', this.showHome);
    },

    hideSections: function(section){
      if(section !== 'home') this.$el.addClass('hidden');
    },

    showHome: function(){
      this.$el.removeClass('hidden');
    }

  });

  var home = new Home();


});

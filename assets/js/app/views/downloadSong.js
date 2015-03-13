$(function(){

  var DownloadSong = Backbone.View.extend({

    el: $('section#download-song'),

    events: {

    },

    initialize: function(){
      this.listenTo(Backbone, 'hideSections', this.hideSections);
      this.listenTo(Backbone, 'showDownloadSong', this.showDownloadSong);
    },

    hideSections: function(section){
      if(section !== 'song') this.$el.addClass('hidden');
    },

    showDownloadSong: function(){
      this.$el.removeClass('hidden');
    }

  });

  var downloadSong = new DownloadSong();


});

$(function(){

  var DownloadSong = Backbone.View.extend({

    el: $('section#download-song'),

    events: {

    },

    initialize: function(){
      this.listenTo(Backbone, 'showDownloadSong', this.showDownloadSong);
    },

    showDownloadSong: function(){
      this.$el.removeClass('hidden');
    }

  });

  var downloadSong = new DownloadSong();


});

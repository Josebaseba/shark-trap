$(function(){

  var DownloadSong = Backbone.View.extend({

    el: $('section#download-song'),

    events: {
      'keypress input'                   : 'keyPressed',
      'click input[data-action=download]': 'downloadSong'
    },

    initialize: function(){
      this.listenTo(Backbone, 'hideSections', this.hideSections);
      this.listenTo(Backbone, 'showDownloadSong', this.showDownloadSong);
      // Elements
      this.$name     = this.$('input#song-name');
      this.$artist   = this.$('input#song-artist');
      this.$error    = this.$('div.error-msg');
      this.$download = this.$('input[data-action=download]');
    },

    hideSections: function(section){
      if(section !== 'song') this.$el.addClass('hidden');
    },

    showDownloadSong: function(){
      this._cleanForm();
      this.$el.removeClass('hidden');
    },

    // User Events

    keyPressed: function(event){
      if(event.keyCode === 13) return this.downloadSong();
    },

    downloadSong: function(){
      this.$error.addClass('no-visibility');
      var params = this._checkForm();
      if(!params) return this._showError('Song name and artist required.');
      this.$download.attr('disabled', true).text('Downloading...');
      app.proxy('GET', 'download-song', params,
                this.songDownloaded, this.errorDownloading, this);
    },

    // Main Methods

    songDownloaded: function(song){
      console.log(song);
    },

    errorDownloading: function(err){
      this.$download.attr('disabled', false).text('Download');
      console.log(err);
    },

    // Pseudo Private

    _checkForm: function(){
      var params = {};
      var name = this.$name.val();
      if(name !== '') params.name = name; else return false;
      var artist = this.$artist.val();
      if(artist !== '') params.artist = artist; else return false;
      return params;
    },

    _showError: function(msg){
      this.$error.find('span').text(msg);
      this.$error.removeClass('no-visibility');
    },

    _cleanForm: function(){
      this.$error.addClass('no-visibility');
      this.$name.val('');
      this.$artist.val('');
    }

  });

  var downloadSong = new DownloadSong();


});

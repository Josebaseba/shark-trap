$(function(){

  var DownloadSong = Backbone.View.extend({

    el: $('section#download-song'),

    events: {
      'keypress input'                           : 'keyPressed',
      'click a[data-action=download]'            : 'saveSong',
      'click input[data-action=prepare-download]': 'downloadSong'
    },

    initialize: function(){
      this.listenTo(Backbone, 'hideSections', this.hideSections);
      this.listenTo(Backbone, 'showDownloadSong', this.showDownloadSong);
      // Elements
      this.$name     = this.$('input#song-name');
      this.$artist   = this.$('input#song-artist');
      this.$error    = this.$('div.error-msg');
      this.$download = this.$('a[data-action=download]');
      this.$preDownload = this.$('input[data-action=prepare-download]');
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
      if(event.keyCode === 13){
        if(!this.$preDownload.hasClass('hidden')) return this.downloadSong();
      }
    },

    downloadSong: function(){
      if(this.$preDownload.attr('disabled') === true) return null;
      this.$error.addClass('no-visibility');
      var params = this._checkForm();
      if(!params) return this._showError('Song name and artist required.');
      this.$preDownload.attr('disabled', true).val('Downloading...');
      app.proxy('GET', 'download-song', params,
                this.songDownloaded, this.errorDownloading, this);
    },

    // Main Methods

    songDownloaded: function(song){
      var url = '/download-song/' + song.token;
      this.$preDownload.addClass('hidden').val('Download');
      this.$download
          .attr('disabled', false).attr('href', url).removeClass('hidden');
    },

    saveSong: function(event){
      if(this.$download.attr('disabled')){
        event.preventDefault();
        return null;
      }
      var $download = this.$download;
      $download.attr('disabled', true)
               .find('input').val('Saving in your computer...');
      var $preDownload = this.$preDownload;
      setTimeout(function(){
        $download.addClass('hidden').attr('disabled', false)
                 .attr('href', 'javascript:void(0)')
                 .find('input').val('Click here to download!');
        $preDownload.removeClass('hidden').attr('disabled', false);
      }, 2000);
    },

    errorDownloading: function(err){
      this.$preDownload.attr('disabled', false).val('Download');
      if(err.status === 404) return this._showError('Song not found...');
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

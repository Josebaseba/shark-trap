$(function(){

  var DownloadPlaylist = Backbone.View.extend({

    el: $('section#download-playlist'),

    events: {
      'keypress input'                   : 'keyPressed',
      'click input[data-action=download]': 'downloadPlaylist'
    },

    initialize: function(){
      this.listenTo(Backbone, 'hideSections', this.hideSections);
      this.listenTo(Backbone, 'showDownloadPlaylist', this.showDownloadPlaylist);
      // Elements
      this.$url      = this.$('input#playlist-url');
      this.$error    = this.$('div.error-msg');
      this.$download = this.$('a[data-action=download]');
    },

    hideSections: function(section){
      if(section !== 'playlist') this.$el.addClass('hidden');
    },

    showDownloadPlaylist: function(){
      this._cleanForm();
      this.$el.removeClass('hidden');
    },

    // User Events

    keyPressed: function(event){
      if(event.keyCode === 13) return this.downloadPlaylist();
    },

    downloadPlaylist: function(){
      if(this.$download.attr('disabled') === true) return null;
      this.$error.addClass('no-visibility');
      var params = this._checkForm();
      if(!params) return this._showError('Invalid playlist URL');
      this.$download.attr('disabled', true).val('Downloading...');
      app.SProxy('GET', '/download-playlist', params,
                this.playlistDownloadStarted, this.errorStartingDownload, this);
    },

    // Main Methods

    playlistDownloadStarted: function(){
      var msg = 'We will send you an email when the download is completed,' +
                ' you can check the status in the my playlist section.';
      Backbone.trigger('successAlert', 'Download started!', msg);
      this._cleanForm();
      this.$download.attr('disabled', false).val('Download');
    },

    errorStartingDownload: function(err){
      this.$download.attr('disabled', false).val('Download');
    },

    // Pseudo Private

    _checkForm: function(){
      var params = {};
      var url = this.$url.val();
      if(url == '') return false;
      var playlist = parseInt(url.split('/')[url.split('/').length - 1]);
      if(isNaN(playlist)) return false;
      params.playlist = playlist;
      return params;
    },

    _showError: function(msg){
      this.$error.find('span').text(msg);
      this.$error.removeClass('no-visibility');
    },

    _cleanForm: function(){
      this.$error.addClass('no-visibility');
      this.$url.val('');
    }

  });

  var downloadPlaylist = new DownloadPlaylist();

});

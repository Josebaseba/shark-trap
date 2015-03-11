/*
* Helper View
* Special view, it works hidding sections listening events that router sends
* listenTo() -> 'hideSections', args: sectionName {String} - hide other sections
*/

$(function(){

  if(!$('body.app').length) return null;

  var Helper = Backbone.View.extend({

    el: $('body.app'),

    initialize: function(){
      this.$home        = this.$('section.options');
      this.$songs       = this.$('section.songs');
      this.$playlist    = this.$('section.playlist');
      this.$myPlaylists = this.$('section.my-playlists');
      this.$profile     = this.$('section.profile');
      this.listenTo(Backbone, 'hideSections', this.hideSections);
    },

    hideSections: function(section){
      console.log(section);
      if(section !== 'home') this.$home.addClass('hidden');
      if(section !== 'songs') this.$songs.addClass('hidden');
      if(section !== 'playlist') this.$playlist.addClass('hidden');
      if(section !== 'myPlaylists') this.$myPlaylists.addClass('hidden');
      if(section !== 'profile') this.$profile.addClass('hidden');
    }

  });

  var helper = new Helper();

});

/**
* Playlist.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    user: {
      model   : 'User',
      required: true
    },

    name: {
      type: 'string'
    },

    groovesharkId: {
      type: 'string',
      required: true
    },

    state: {
      type: 'string',
      defaultsTo: 'downloading'
    }

  },

  afterUpdate: function(values, next){
    if(values.state === 'completed') sails.log('Send email', values);
    return next();
  }

};

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

    groovesharkId: {
      type: 'string',
      required: true
    },

    state: {
      type: 'string',
      defaultsTo: 'downloading'
    },

    zipUrl: {
      type: 'string'
    },

    token: {
      type: 'string'
    }

  },

  beforeCreate: function(values, next){
    values.token = _randomToken();
    next();
  },

  afterUpdate: function(values, next){
    if(values.state === 'completed'){
      sails.log('Send email with link', values);
    }
    return next();
  }

};

var _rand = function() {
  return Math.random().toString(36).substr(2);
};

var _randomToken = function(){
  return _rand() + _rand() + _rand();
};

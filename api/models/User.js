/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    email: {
      type    : 'string',
      email   : true,
      required: true
    },

    password: {
      type    : 'string',
      required: true
    },

    playlists: {
      collection: 'playlist',
      via       : 'user'
    },

    role: {
      type      : 'string',
      defaultsTo: 'user'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete this.password;
      return this;
    }

  },

  beforeCreate: function(values, next) {
    if(values.password) hashPassword(values, next);
    else next();
  },

  beforeUpdate: function(values, next) {
    if(values.role) delete values.role;
    if(values.password) hashPassword(values, next);
    else next();
  },

  login: function(params, cb){
    User.findOne({email: params.email}).exec(function(err, user){
      if(err) return cb(err);
      if(!user) return cb('Login error');
      bcrypt.compare(params.password, user.password, function (err, valid){
        if(err) return cb(err);
        if(valid) cb(null, user); else cb('Login error');
      });
    });
  }

};

function hashPassword(values, next) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(values.password, salt, function(err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });
  });
}

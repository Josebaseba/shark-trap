/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function(req, res){
    var params = req.validator([{email: 'email'}, 'password']);
    if(!params) return null;
    User.login(params, function(err, user){
      if(err) return res.badRequest();
      req.session.authenticated = true;
      req.session.user = user.id;
      return res.ok();
    });
  },

  update: function(req, res){
    var params = req.validator([{email: 'email', password: '?password'}]);
    if(!params) return null;
    User.update(req.session.user, params).exec(function(err, user){
      if(err) return res.serverError(err);
      if(!user.length) return res.notFound();
      return res.ok(user[0]);
    });
  },

  logout: function(req, res){
    req.session.destroy();
    return res.redirect('/');
  }

};

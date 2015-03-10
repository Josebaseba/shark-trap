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
      res.redirect('/');
    });
  }

};

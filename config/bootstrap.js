/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  /* If we don't have users create the initial user */
  /* USER: */
  /* email: admin@sharktrap.org | password: sharktrap | role: admin */

  User.count().exec(function usersCount(err, users){
    if(err) return cb(err);
    if(users !== 0) return cb();
    var user = {email: 'admin@sharktrap.org', password: 'sharktrap', role: 'admin'};
    User.create(user).exec(cb);
  });

};

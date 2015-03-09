/* Main Actions Controller */

module.exports = {

  index: function(req, res){
    sails.log(req.session);
    if(req.session.authenticated) return res.view('application');
    return res.view('homepage');
  }

}

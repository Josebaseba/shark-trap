/* Main Actions Controller */

module.exports = {

  index: function(req, res){
    if(req.session.authenticated) return res.view('application');
    return res.view('homepage');
  }

}

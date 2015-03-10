/* MAIN FILE */

var app = app || {};

app.homepage = !!$('div#homepage').length;

$(function(){

  console.log('====================');
  console.log('=== UP & RUNNING ===');
  console.log('====================');

  // SOCKETS PROXY

  app.proxy = function(method, url, data, onSuccess, onError, ctx){

    var that = ctx || this;

    method = method.toLowerCase();

    io.socket[method](url, data, function(resData){

      console.log(resData);

    });

  };


});

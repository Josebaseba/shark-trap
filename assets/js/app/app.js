/* MAIN FILE */

var app = app || {};

app.homepage = !!$('div#homepage').length;

if(app.homepage) $('html').addClass('homepage');

$(function(){

  console.log('====================');
  console.log('=== UP & RUNNING ===');
  console.log('====================');

  // SOCKETS PROXY

  app.proxy = function(method, url, data, onSuccess, onError, ctx){

    var that = ctx || this;

    method = method.toLowerCase();

    io.socket[method](url, data, function(resData, body){

      if(body.statusCode >= 300) return onError.call(that, resData, body);

      return onSuccess.call(that, resData, body);

    });

  };


});

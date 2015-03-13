/* MAIN FILE */

var app = app || {};

app.homepage = !!$('div#homepage').length;

if(app.homepage) $('html').addClass('homepage'); else $('body').addClass('app');

$(function(){

  console.log('====================');
  console.log('=== UP & RUNNING ===');
  console.log('====================');

  // SOCKETS PROXY

  app.SProxy = function(method, url, data, onSuccess, onError, context){

    var that = context || this;

    method = method.toLowerCase();

    io.socket[method](url, data, function(resData, body){

      if(body.statusCode >= 300) return onError.call(that, resData, body);

      return onSuccess.call(that, resData, body);

    });

  };

  // HTTP Proxy

  app.proxy = function(method, url, data, onSuccess, onError, context){

    $.ajax({
      method : method,
      url    : url,
      data   : data,
      context: context
    }).done(function(res){
      return onSuccess.call(this, res);
    }).error(function(err){
      return onError.call(this, err);
    });

  }


});

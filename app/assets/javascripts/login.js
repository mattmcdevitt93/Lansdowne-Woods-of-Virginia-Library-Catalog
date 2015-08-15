'use strict';
var Cookie =  Cookie || {};
var Model = Model || {};

// ----------------------------------------------------------------------------
// LOGIN CODE
// ----------------------------------------------------------------------------

Model.login = function() {
  var loginInput = document.getElementById('auth').value;
  var Auth = Model.authCode;
  console.log(loginInput);
  console.log(Auth);
  if (loginInput === Auth) {
    console.log('Login Verified');
    Cookie.makeCookie('Auth', loginInput);
    Model.enable();
  } else {
    console.log('Login Failed');
  }
};

Model.disable = function() {
  $('.addBtn').addClass('disabled');
  $('.login').removeClass('hidden');
  $('.logout').addClass('hidden');
};

Model.enable = function() {
  $('.addBtn').removeClass('disabled');
  $('.login').addClass('hidden');
  $('.logout').removeClass('hidden');
};



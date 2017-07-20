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
  console.log('Disable Login');

  $('.addBtn').addClass('hidden');
  $('.login').removeClass('hidden');
  $('.logout').addClass('hidden');
};

Model.enable = function() {
  console.log('Enable Login');
  $('.addBtn').removeClass('hidden');
  $('.login').addClass('hidden');
  $('.logout').removeClass('hidden');
};



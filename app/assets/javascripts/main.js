'use strict';
var Cookie = {};
var Model = {};

Model.authCode = 12345;
Model.addButton = document.getElementById('addBtn');

$(document).ready(function() {
    console.log( 'ready!' );
    Cookie.checkCookie('Auth');
});

Model.search = function() {
	var type = $('#type').val();
	var keywords = $('#searchBar').val();
	console.log(type, keywords);
	var queryData = document.querySelectorAll( '.' + type );
	var queryLength = queryData.length;
	var r = [];
	for (var i = 0; i < queryLength; i++) {
		var a = queryData[i].innerHTML;
		if (keywords === a) {
			console.log('MATCH', i);
			console.log(queryData[i]);
			r.push(queryData[i].parentNode.id);
		}
	}
	console.log(r);
};


// LOGIN CODE

Model.login = function() {
	var loginInput = document.getElementById('auth').value;
	var Auth = Model.authCode;
	var verified = Cookie.getCookie('Auth');
	console.log(loginInput);
	console.log(Auth);
	console.log(verified);
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
};

Model.enable = function() {
	$('.addBtn').removeClass('disabled');
};

// COOKIES - Yum

Cookie.checkCookie = function(cookie) {
  if ((Cookie.getCookie(cookie) === 'null') || (Cookie.getCookie(cookie) === undefined) || (Cookie.getCookie(cookie) === null)) {
    console.log('No Auth'); // change this once i get the ability to pull the next name from the back end
    Model.disable();
  } else {
    console.log('Cookie value is = ' + Cookie.getCookie(cookie));
    Model.enable();
  }
};

Cookie.getCookie = function(key){
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
};

Cookie.makeCookie = function(key, token) {
  var now = new Date();
  var time = now.getTime();
  time += 3600 * 1000;
  now.setTime(time);
  var temp = key + '=' + token + '; expires=' + now.toUTCString();
  document.cookie = temp;
};



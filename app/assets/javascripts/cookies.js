'use strict';
var Cookie =  Cookie || {};
var Model = Model || {};

// ----------------------------------------------------------------------------
// COOKIES - Yum
// ----------------------------------------------------------------------------

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
	time += 7200 * 1000;
	now.setTime(time);
	var temp = key + '=' + token + '; expires=' + now.toUTCString();
	document.cookie = temp;
};


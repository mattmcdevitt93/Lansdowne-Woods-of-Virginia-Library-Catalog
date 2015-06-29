'use strict';
var Cookie = {};
var Model = {};

Model.authCode = '12345';
Model.addButton = document.getElementById('addBtn');
Model.showTable = false;
Model.searchSensitivity = 5;


$(document).ready(function() {
	console.log( 'ready!' );
	Cookie.checkCookie('Auth');
	Model.events();
});

// Fixes return key for search

Model.events = function () {
	$( '#searchBar' ).keypress(function() {
		if ( event.which === 13 ) {
			event.preventDefault();
			console.log('prevented default');
			Model.search();
		}});
};

// ----------------------------------------------------------------------------
// SEARCH FUNCTIONALITY
// ---------------------------------------------------------------------------- 

Model.search = function() {
	var error = false;
	var type = $('#type').val();
	var keywords = $('#searchBar').val();

	var queryData = document.querySelectorAll( '.' + type );
	var queryLength = queryData.length;
	var r = [];
	var s = Model.searchSensitivity;

	if (type === 'Copyright') {
		var yearChk = Model.regexChkYear(keywords);
		if (yearChk === false) {
			error = 'Invalid_year';
			console.log('Error Invalid Year');
		}
		s = 1;
	}

	if (error === false && type !== 'Call_num') {

		for (var i = 0; i < queryLength; i++) {

			var a = queryData[i].innerHTML;
			console.log(a);

			if (error === false) {
				var d = Model.getEditDistance(keywords, a);
				console.log(d);
		if (d < s) { // THE CHECK
			console.log('MATCH', i);
			console.log(queryData[i]);
			r.push(queryData[i].parentNode.id);
		}
	} 

}

Model.results(r, keywords);
} else if (error === false && type === 'Call_num') {
	console.log('Call Num Search');
	var n = parseInt(keywords);
	console.log(n);
	if (n === 'NaN') {
		error = true;
		Model.notice('Not a valid Call Number.');
	} else {	
	s = 3;

		for (var i = 0; i < queryLength; i++) {

			var a = queryData[i].innerHTML;
			console.log(a);

			if (error === false) {
				var d = Model.getEditDistance(keywords, a);
				console.log(d);
			if (d < s) { // THE CHECK
				console.log('MATCH', i);
				console.log(queryData[i]);
				r.push(queryData[i].parentNode.id);
			}
		} 

	}
	Model.results(r, keywords);

}


} else if (error === 'Invalid_year'){
	Model.notice('Not a valid year to search by');
} else {
	Model.notice('Sorry there was an error with the search.');	
}

};

// Compute the edit distance between the two given strings

Model.getEditDistance = function (a, b) {

	if(a.length === 0) {return b.length;} 
	if(b.length === 0) {return a.length;} 

	var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
  	matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
  	matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
  	for(j = 1; j <= a.length; j++){
  		if(b.charAt(i-1) === a.charAt(j-1)){
  			matrix[i][j] = matrix[i-1][j-1];
  		} else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
    }
}
}

return matrix[b.length][a.length];

};

Model.results = function (results, keywords) {
	Model.hideAll();
	var rLength = results.length;
	$('#results').addClass('btn-success');
	$('#results').removeClass('btn-warning');
	$('#results').html( 'Results - There are ' + rLength + ' results fom your search for "' + keywords + '"');
	$('#results').removeClass('hidden');
	if (rLength > 0) {
		$('#tableKey').removeClass('hidden');
	}
	for (var i = 0; i < rLength; i++) {
		var s = results[i];
		console.log(s);
		$('#' + s).removeClass('hidden');
	}
};

Model.notice = function (string) {
	Model.hideAll();
	$('#results').html( 'Error - ' + string );
	$('#results').removeClass('hidden');
	$('#results').removeClass('btn-success');
	$('#results').addClass('btn-warning');
};

// ----------------------------------------------------------------------------
// Reg Ex Checks
// ----------------------------------------------------------------------------

Model.regexChkYear = function (s) {
	var r = new RegExp ('[0-9]{4}');
	return r.test(s);
};

Model.regexChkCallNum = function (s) {
	var r = new RegExp ('[0-9]{3}');
	return r.test(s);
};



// ----------------------------------------------------------------------------
// SHOW ALL BOOKS
// ----------------------------------------------------------------------------

Model.toggleAll = function () {
	if (Model.showTable === true) {
		Model.hideAll();
		Model.showTable = false;
		document.getElementById('viewAll').value = 'Show All Books';
	} else {
		Model.viewAll();
		Model.showTable = true;
		document.getElementById('viewAll').value = 'Hide Table';

	}
};

Model.viewAll = function () {
	$('.hidden').removeClass('hidden');
	$('#results').addClass('hidden');
};

Model.hideAll = function () {
	$('tr').addClass('hidden');
};

// ----------------------------------------------------------------------------
// LOGIN CODE
// ----------------------------------------------------------------------------

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
	time += 3600 * 1000;
	now.setTime(time);
	var temp = key + '=' + token + '; expires=' + now.toUTCString();
	document.cookie = temp;
};



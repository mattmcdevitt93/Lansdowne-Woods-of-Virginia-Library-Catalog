'use strict';
var Cookie =  Cookie || {};
var Model = Model || {};

Model.authCode = 'WLdatabaseLW';
Model.addButton = $('.addbtn');
Model.showTable = false;
Model.searchSensitivity = 3;


$(document).ready(function() {
	console.log( 'ready!!!' );
	Model.headerResize();
	Model.events();
	Cookie.checkCookie('Auth');
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

Model.headerResize = function () {
	console.log('resize');
	var padding = $('.headder').height();
	$('.buffer').css('height', padding + 7);
	// $('.masthead_image').css('height', padding - 15);
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
	Cookie.checkCookie('Auth');
};

Model.viewAll = function () {
	$('.hidden').removeClass('hidden');
	$('#results').addClass('hidden');
};

Model.hideAll = function () {
	$('tr').addClass('hidden');
};


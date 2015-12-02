'use strict';
var Cookie =  Cookie || {};
var Model = Model || {};
var Firebase = Firebase || {};
Model.FirebaseRef = new Firebase('https://wilson-library-log.firebaseio.com/');

// ----------------------------------------------------------------------------
// Firebase Backup FUNCTIONALITY
// ----------------------------------------------------------------------------

Model.backup = function() {
  console.log('FB backup');
  var tlength = document.getElementById('table').getElementsByTagName('tr').length;
  for (var i = 1; i < tlength; i++) {
    console.log(i, document.getElementById(i));

    // Gather data
    var temp = document.getElementById(i);
    if (temp !== null) {
    var a = temp.getElementsByClassName('Call_num')[0].innerHTML;
    var b = temp.getElementsByClassName('Title')[0].innerHTML;
    var c = temp.getElementsByClassName('Subtitle')[0].innerHTML;
    var d = temp.getElementsByClassName('Author_last')[0].innerHTML;
    var e = temp.getElementsByClassName('Author_first')[0].innerHTML;
    var f = temp.getElementsByClassName('Copyright')[0].innerHTML;
    var g = temp.getElementsByClassName('Subject')[0].innerHTML;
    var h = temp.getElementsByClassName('Annotation')[0].innerHTML;
    var j = temp.getElementsByClassName('created_at')[0].innerHTML;
    var k = temp.getElementsByClassName('updated_at')[0].innerHTML;
    var fbPush = {
      Call_Number: a,
      Title: b,
      Subtitle: c,
      Author_last: d, 
      Author_first: e,
      Copyright: f,
      Subject: g,
      Annotation: h,
      created_at: j,
      updated_at: k
    };
    console.log(fbPush);
    Model.FirebaseRef.push().set(fbPush);

    }
  }
};


// ----------------------------------------------------------------------------
// SEARCH FUNCTIONALITY
// ----------------------------------------------------------------------------

Model.search = function() {
  var error = false;
  var type = $('#type').val();
  var keywords = $('#searchBar').val();
  var k = Model.regexTrim(keywords);
  var queryData = document.querySelectorAll( '.' + type );
  var queryLength = queryData.length;
  var r = [];
  var s = Model.searchSensitivity;

  if (type === 'Copyright') {
    var yearChk = Model.regexChkYear(k);
    if (yearChk === false) {
      error = 'Invalid_year';
      console.log('Error Invalid Year');
    }
  }

  if (error === false) {

    for (var i = 0; i < queryLength; i++) {

      var a = queryData[i].innerHTML;
      a = Model.regexTrim(a);
      var f = a.length - (a.length * (s / 100));
      console.log('query length = ', a.length);
      if (error === false) {
        var d = Model.getEditDistance(k, a);
        console.log (a, ' - distance = ', d, ' check threshold = ', f);
        if (d <= f) { // THE CHECK
          console.log('MATCH');
          r.push(queryData[i].parentNode.id);
        }
      }
    }
    // Model.results(r, keywords);

    Model.resultsRefactor(r, keywords);
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

Model.resultsRefactor = function (results, keywords) {
  var rLength = results.length;
  Model.resultFormat(rLength, keywords);
  console.log('results refactor');

  if (rLength > 0) {
    $('#tableKey').removeClass('hidden');
  }

  for (var i = 0; i < rLength; i++) {
    var s = results[i];
    var w = $('#' + s);
    $('#resultsTbl').append(w);
  }
};


Model.results = function (results, keywords) {
  var rLength = results.length;
  Model.resultFormat(rLength, keywords);
  if (rLength > 0) {
    $('#tableKey').removeClass('hidden');
  }

  for (var i = 0; i < rLength; i++) {
    var s = results[i];
    console.log(s);
    $('#' + s).removeClass('hidden');
  }
  Model.showTable = true;
  document.getElementById('viewAll').value = 'Hide Table';

};

Model.resultFormat = function (rLength, keywords) {
  Model.hideAll();
  $('#results').addClass('btn-success');
  $('#results').removeClass('btn-warning');
  $('#results').html( 'Results - There are ' + rLength + ' results for your search for "' + keywords + '"');
  $('#results').removeClass('hidden');
};

Model.notice = function (string) {
  Model.hideAll();
  $('#results').html( 'Error - ' + string );
  $('#results').removeClass('hidden');
  $('#results').removeClass('btn-success');
  $('#results').addClass('btn-warning');
};

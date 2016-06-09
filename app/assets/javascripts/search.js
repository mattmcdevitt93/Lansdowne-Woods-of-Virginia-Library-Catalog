'use strict';
var Cookie =  Cookie || {};
var Model = Model || {};

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

  if (error === false) {

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

  a = a.toLowerCase();
  b = b.toLowerCase();

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

Model.search_regex = function (d) {

  return d;
}

Model.results = function (results, keywords) {
  Model.hideAll();
  var rLength = results.length;
  $('#results').addClass('btn-success');
  $('#results').removeClass('btn-warning');
  $('#results').html( 'Results - There are ' + rLength + ' results for your search for "' + keywords + '"');
  $('#results').removeClass('hidden');
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

Model.notice = function (string) {
  Model.hideAll();
  $('#results').html( 'Error - ' + string );
  $('#results').removeClass('hidden');
  $('#results').removeClass('btn-success');
  $('#results').addClass('btn-warning');
};

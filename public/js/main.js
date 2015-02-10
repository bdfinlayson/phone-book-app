/* jshint browser: true, jquery: true */

'use strict'

function hello() {
  return 'world';
}

var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://phone-book-app.firebaseio.com/.json';

$.get(FIREBASE_URL, function (res) {
  Object.keys(res).forEach(function (uuid) {
    addRowToTable(uuid, res[uuid]);
  });
});

$tbody.on('click', 'td', function (evt) {
  // this = event.target;
  var $tr  = $(evt.target).closest('tr'),
      uuid = $tr.data('uuid'),
      contactName = $tr.find('td').text();

  if (confirmContactRemoval(contactName)) {
    $tr.remove();
    deleteContactFromDb(uuid);
  }
});

$form.submit(function (evt) {
  var $contactName = $('input[name="contactName"]'),
      req         = {name: $contactName.val()};

  evt.preventDefault();

  addContactToDb(req, function (res) {
    var $tr = $('<tr><td>' + req.name + '</td></tr>');

    $tr.attr('data-uuid', res.name);
    $tbody.append($tr);
  });

  $contactName.val('');
});

function addContactToDb(data, cb) {
  var url           = FIREBASE_URL + '/name.json',
      jsonifiedData = JSON.stringify(data);

  $.post(url, jsonifiedData, function (res) { return cb(res); });
}

function deleteContactFromDb(uuid) {
  var url = FIREBASE_URL + '/name/' + uuid + '.json';

  $.ajax(url, {type: 'DELETE'});
}

function addRowToTable(uuid, data) {
  var $tr = $('<tr><td>' + data.name + '</td></tr>');

  $tr.attr('data-uuid', uuid);
  $tbody.append($tr);
}

function confirmContactRemoval(contactName) {
  var confirmationText = 'Remove ' + contactName + ' from contact list?',
      isConfirmed      = window.confirm(confirmationText);

  return isConfirmed;
}










function buttonMessage(message) {

  var message = 'I was clicked!';
   return message;
}

$('input').click(function(event) {
  event.preventDefault();
  console.log('event prevented');
  });



/* jshint browser: true, jquery: true */

'use strict'

function hello() {
  return 'world';
}










function buttonMessage(message) {

  var message = 'I was clicked!';
   return message;
}

$('input').click(function(event) {
  event.preventDefault();
  console.log('event prevented');
  });


/* jshint browser: true, jquery: true */

'use strict';

var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://phone-book-app.firebaseio.com';

$.get(FIREBASE_URL + '/friends.json', function (res) {
  Object.keys(res).forEach(function (uuid) {
    addRowToTable(uuid, res[uuid]);
  });
});

$tbody.on('click', 'td', function (evt) {
  // this = event.target;
  var $tr  = $(evt.target).closest('tr'),
      uuid = $tr.data('uuid'),
      friendName = $tr.find('td').text();

  if (confirmFriendRemoval(friendName)) {
    $tr.remove();
    deleteFriendFromDb(uuid);
  }
});

$form.submit(function (evt) {
  var $friendName = $('input[name="friendName"]'),
      req         = {name: $friendName.val()};

  evt.preventDefault();

  addFriendToDb(req, function (res) {
    var $tr = $('<tr><td>' + req.name + '</td></tr>');

    $tr.attr('data-uuid', res.name);
    $tbody.append($tr);
  });

  $friendName.val('');
});

function addFriendToDb(data, cb) {
  var url           = FIREBASE_URL + '/friends.json',
      jsonifiedData = JSON.stringify(data);

  $.post(url, jsonifiedData, function (res) { return cb(res); });
}

function deleteFriendFromDb(uuid) {
  var url = FIREBASE_URL + '/friends/' + uuid + '.json';

  $.ajax(url, {type: 'DELETE'});
}

function addRowToTable(uuid, data) {
  var $tr = $('<tr><td>' + data.name + '</td></tr>');

  $tr.attr('data-uuid', uuid);
  $tbody.append($tr);
}

function confirmFriendRemoval(friendName) {
  var confirmationText = 'Remove ' + friendName + ' from friend list?',
      isConfirmed      = window.confirm(confirmationText);

  return isConfirmed;
}



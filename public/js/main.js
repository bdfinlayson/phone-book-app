/* jshint browser: true, jquery: true */

'use strict';

var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://phone-book-app.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL),
    usersFbUrl;


if (fb.getAuth()) {
  usersFbUrl   = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';

  $.get(usersFbUrl + '/friends.json', function (res) {
    Object.keys(res).forEach(function (uuid) {
      addRowToTable(uuid, res[uuid]);
    });
    });

  $('.login').remove();
  $('.loggedIn').toggleClass('hidden');
}

// Login

$('.login input[type="button"]').click(function(event){
  var $loginForm = $(event.target).closest('form'),
      email = $loginForm.find('[type="email"]').val(),
      pass = $loginForm.find('[type="password"]').val(),
      data = {email: email, password: pass};

  fb.createUser(data, function (err) {
        if (!err) {
            fb.authWithPassword(data, function (err) {
        if (!err) {
          location.reload(true);
        }
      });
    }
  });
});

$('.login form').submit(function(event){
  var $form = $(event.target),
      email = $form.find('[type="email"]').val(),
      pass = $form.find('[type="password"]').val();

  fb.authWithPassword({email: email, password: pass}, function(err, auth) {
        location.reload(true);
  });

  event.preventDefault();
});

$('.logout').click(function(){
  fb.unauth();
  location.reload(true);
})

// Friends

$tbody.on('click', '.delete', function (evt) {
  // this = event.target;
  var $tr  = $(evt.target).closest('tr'),
      uuid = $tr.data('uuid'),
      deleteUser = $tr.find('.delete').text();

  if (confirmFriendRemoval(deleteUser)) {
    $tr.remove();
    deleteFriendFromDb(uuid);
  }
});

$form.submit(function (evt) {
  var $firstName = $('input[name="firstName"]'),
      $lastName  = $('input[name="lastName"]'),
      $phone  = $('input[name="phoneNumber"]'),
      $email  = $('input[name="email"]'),
      $address  = $('input[name="address"]'),
      $twitter  = $('input[name="twitter"]'),
      $github  = $('input[name="github"]'),
      req         = {firstName: $firstName.val(),
                     lastName: $lastName.val(),
                     phone: $phone.val(),
                     email: $email.val(),
                     address: $address.val(),
                     twitter: $twitter.val(),
                     github: $github.val(),
      };

  evt.preventDefault();

  addFriendToDb(req, function (res) {
    console.log(req)
    console.log(res)
    var gravatar = $('<img>').attr({src: 'http://www.gravatar.com/avatar/' + md5(req.email)});
    var $tr = $('<tr><td><img src="'+gravatar[0].currentSrc+'"></img></td><td>' + req.firstName + '</td><td>' +req.lastName+ '</td><td>' + req.phone + '</td><td><a href="mailto:'+req.email+'">' + req.email + '</a></td><td>' + req.address + '</td><td><a href="https://twitter.com/'+req.twitter+'"target="_blank">' + req.twitter + '</a></td><td><a href="https://github.com/' + req.github+'" target="_blank">' +req.github + '</a></td><td class="delete">Delete '+req.firstName+' '+req.lastName+'</td>></tr>' );

    $tr.attr('data-uuid', res.uuid);
  $tbody.append($tr);
  });

  $firstName.val('');
  $lastName.val('');
  $phone.val('');
  $email.val('');
  $address.val('');
  $twitter.val('');
  $github.val('');
});

function addFriendToDb(data, cb) {
  var url           = usersFbUrl + '/friends.json',
      jsonifiedData = JSON.stringify(data);

  $.post(url, jsonifiedData, function (res) { return cb(res); });
}

function deleteFriendFromDb(uuid) {
  var url = usersFbUrl + '/friends/' + uuid + '.json';

  $.ajax(url, {type: 'DELETE'});
}

function addRowToTable(uuid, data) {
  var gravatar = $('<img>').attr({src: 'http://www.gravatar.com/avatar/' + md5(data.email)});
  var $tr = $('<tr><td><img src="'+gravatar[0].currentSrc+'"></img></td><td>' + data.firstName + '</td><td>' +data.lastName+ '</td><td>' + data.phone + '</td><td><a href="mailto:'+data.email+'">' + data.email + '</a></td><td>' + data.address + '</td><td><a href="https://twitter.com/'+data.twitter+'"target="_blank">' + data.twitter + '</a></td><td><a href="https://github.com/' + data.github+'" target="_blank">' + data.github + '</a></td><td class="delete">Delete '+data.firstName+' '+data.lastName+'</td>></tr>' );

  $tr.attr('data-uuid', uuid);
  $tbody.append($tr);
}

function confirmFriendRemoval(friendName) {
  var confirmationText = 'Remove ' + friendName + ' from friend list?',
      isConfirmed      = window.confirm(confirmationText);

  return isConfirmed;
}


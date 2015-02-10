/* jshint browser: true, jquery: true */

'use strict'





///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

//function hello() {
  //return 'world';
//}


//function buttonMessage(message) {

  //var message = 'I was clicked!';
   //return message;
//}

//$('input').click(function(event) {
  //event.preventDefault();
  //console.log('event prevented');
  //});


//$(document).read(function() {

  //var $form = $('.form');
  //var $tbody = $('.tbody');

//});

//[> jshint browser: true, jquery: true <]

//'use strict';

var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://phone-book-app.firebaseio.com/',
    fb           = new Firebase(FIREBASE_URL),
    usersFbUrl   = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';

//if (fb.getAuth()) {
  //$('.login').remove();
  //$('.loggedIn').toggleClass('hidden');
//}

//$('.register').click(function(event){
  //var $form = $(event.target.closest('form')),
      //email = $form.find('[type="email"]').val(),
      //pass = $form.find('[type="password"]').val(),
      //data = {email: email, password: pass};

  //fb.createUser(data, function(err, d) {
    //console.log(err, d)
        //if (!err) {
            //fb.authWithPassword({email: email, password: pass}, function (err, auth){
        //location.reload(true);
      //});
    //}
  //});

//})

//$('.login form').submit(function(event){
  //var $form = $(event.target),
      //email = $form.find('[type="email"]').val(),
      //pass = $form.find('[type="password"]').val();

  //fb.authWithPassword({email: email, password: pass}, function(err, auth) {
        //location.reload(true);
  //});

  //event.preventDefault();
//});

//$('.logout').click(function(){
  //fb.unauth();
  //location.reload(true);
//})

//$.get(usersFbUrl + '/friends.json', function (res) {
  //Object.keys(res).forEach(function (uuid) {
    //addRowToTable(uuid, res[uuid]);
  //});
//});

//$tbody.on('click', 'td', function (evt) {
  //// this = event.target;
  //var $tr  = $(evt.target).closest('tr'),
      //uuid = $tr.data('uuid'),
      //friendName = $tr.find('td').text();

  //if (confirmFriendRemoval(friendName)) {
    //$tr.remove();
    //deleteFriendFromDb(uuid);
  //}
//});

//$form.submit(function (evt) {
  //var $friendName = $('input[name="friendName"]'),
      //req         = {name: $friendName.val()};

  //evt.preventDefault();

  //addFriendToDb(req, function (res) {
    //var $tr = $('<tr><td>' + req.name + '</td></tr>');

    //$tr.attr('data-uuid', res.name);
    //$tbody.append($tr);
  //});

  //$friendName.val('');
//});

//function addFriendToDb(data, cb) {
  //var url           = usersFbUrl + '/friends.json',
      //jsonifiedData = JSON.stringify(data);

  //$.post(url, jsonifiedData, function (res) { return cb(res); });
//}

//function deleteFriendFromDb(uuid) {
  //var url = usersFbUrl + '/friends/' + uuid + '.json';

  //$.ajax(url, {type: 'DELETE'});
//}

//function addRowToTable(uuid, data) {
  //var $tr = $('<tr><td>' + data.name + '</td></tr>');

  //$tr.attr('data-uuid', uuid);
  //$tbody.append($tr);
//}

//function confirmFriendRemoval(friendName) {
  //var confirmationText = 'Remove ' + friendName + ' from friend list?',
      //isConfirmed      = window.confirm(confirmationText);

  //return isConfirmed;
//}


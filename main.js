  // get firebase database reference...
  var db_ref = firebase.database().ref('/');

  db_ref.on('child_added', function (data) {
  console.log("added",data);
    var type;
    if(data.val().user_id == user_id){
      type="sent";
    }
    else{
      type="replies";
    }
    $('<li class="'+type+'"><p> '+data.val().username+' : ' + data.val().message + '<br/><small>'+data.val().sent_at+'</small></p></li>').appendTo($('.messages ul'));
    $('#message').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + data.val().message);

      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, 0);
  });

  function writeUserData(message) {
      var username= $("#username").val();
      db_ref.push({
          user_id: user_id,
          message: message,
          username: username,
          sent_at:  new Date().toISOString()
      });
  }

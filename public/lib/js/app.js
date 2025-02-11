var imgUrl = '';
//$('.fb-welcome, #start-text, #loginbtn, #loadimg, #lower-div').toggle();
window.fbAsyncInit = function() {
  FB.init({
    appId: '410430555807843',
    xfbml: true,
    version: 'v2.3'
  });
  function onLogin(response) {
    if (response.status == 'connected') {
      FB.api(
        "/me/picture?width=400&height=400",
        function (response) {
          if (response && !response.error) {
            imgUrl = response.data.url;
            document.getElementById('profile-pic').src = imgUrl;
            document.getElementById('filename').value = imgUrl;
            $('.fb-welcome, #start-text, #loginbtn, #loadimg, #lower-div').toggle();
          }
        }
      );
      FB.api('/me?fields=first_name', function(data) {
        var welcomeBlock = document.getElementById('fb-welcome');
        welcomeBlock.innerHTML = 'Hi, ' + data.first_name + '.';
      });
    }
  }

  FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      onLogin(response);
    } else {
      // Otherwise, show Login dialog first.
      FB.login(function(response) {
        onLogin(response);
      }, {scope: 'user_photos'});
    }
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function post() {
  FB.api(
    "/me/feed",
    "POST",
    {
        "message": "I just celebrated Independence Day with https://apps.facebook.com/celebratejulyfourth.",
        "link": "https://apps.facebook.com/celebratejulyfourth"
    },
    function (response) {
      if (response && !response.error) {
        $('#myform').submit();
      }
    }
);
}

function login() {
  FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      onLogin(response);
    } else {
      // Otherwise, show Login dialog first.
      FB.login(function(response) {
        onLogin(response);
      }, {scope: 'user_photos'});
    }
  });
}

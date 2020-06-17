$(document).ready(function() {
  $('input').focus(function() {
    const label = $(`label[for=${$(this).attr('id')}]`);
    label.css('color', '#793b72');
  });

  $('input').focusout(function() {
    const label = $(`label[for=${$(this).attr('id')}]`);
    label.css('color', '#b4b4b4');
  });

  $('#login-form').submit(function(e) {
    event.preventDefault(); //prevent default action

    const email = $('#email').val();
    const password = $('#password').val();

    if (!email) {
      console.log('missing email');
    }
    if (!password) {
      console.log('missing password');
    }
    if (email && password) {
      fetch('https://finalexam-365f.restdb.io/rest/investors', {
        headers: {
          'content-type': 'application/json',
          'x-apikey': '5ecaba904a532801892ed724',
          'cache-control': 'no-cache'
        }
      })
        .then(response => response.json())
        .then(data => login(data, email, password));
    }
  });
});

const login = (data, email, password) => {
  if (data.length > 0) {
    const foundUser = data.find(
      user => user.email === email && user.password === password
    );
    if (foundUser === undefined) {
      console.log('User not found');
    } else {
      console.log('Logged in succesfully.');
    }
  } else {
    console.log('User not found');
  }
};

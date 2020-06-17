$(document).ready(function() {
  let timeout = null;
  $('.authentication-input').keyup(function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      const email = $('#email').val();
      const password = $('#password').val();
      if (email && password) {
        if (password.length >= 6) {
          $('#email-button').removeAttr('disabled');
        }
      }
    }, 300);
  });

  $('input').focus(function() {
    const label = $(`label[for=${$(this).attr('id')}]`);
    label.css('color', '#793b72');
  });

  $('input').focusout(function() {
    const label = $(`label[for=${$(this).attr('id')}]`);
    label.css('color', '#b4b4b4');
  });

  $('#registerForm').submit(function(e) {
    e.preventDefault();
  });

  $('#termsModal').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let registerType = button.data('register'); // Extract info from data-* attributes

    registerUser(registerType);
  });
});

const registerUser = registerType => {
  $('#register-continue-button').click(function(event) {
    //Switch statement to decide what page should be displayed next, based on the button pressed
    switch (registerType) {
      case 'email':
        signUpWithEmail(event);
        break;
      case 'google':
        break;
      case 'facebook':
        break;
      default:
        break;
    }
  });
};

const signUpWithEmail = event => {
  event.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();

  if (email && password) {
    const user = { email: email, password: password };

    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://finalexam-365f.restdb.io/rest/investors',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-apikey': '5ecaba904a532801892ed724',
        'cache-control': 'no-cache'
      },
      processData: false,
      data: JSON.stringify(user)
    };

    $.ajax(settings)
      .done(function(response) {
        const userId = response._id;
        localStorage.setItem('userId', userId);
        location.href = 'name-age.html';
      })
      .fail(function(error) {
        $('#termsModalModal').modal('hide');
        console.log('User already exist.');
      });
  } else {
    $('#termsModalModal').modal('hide');
    console.log('Invalid fields');
  }
};

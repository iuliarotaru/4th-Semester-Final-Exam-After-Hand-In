$(document).ready(function() {
  let timeout = null;
  $('input').keyup(function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      const firstName = $('#first-name').val();
      const lastName = $('#last-name').val();
      const age = $('#age').val();
      const reg = /^[a-zA-Z]+$/;
      if (firstName && lastName && age) {
        if (reg.test(firstName) && reg.test(lastName)) {
          $('#next-button').removeAttr('disabled');
          $('#next-button').addClass('continue-button');
          $('#next-button').removeClass('continue-button-disabled');
        }
      }
    }, 400);
  });

  $('#name-age-form').submit(function(e) {
    e.preventDefault();
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const age = $('#age').val();
    if (!firstName) {
      console.log('first name does not exist');
    }
    if (!lastName) {
      console.log('last name does not exist');
    }
    if (!age) {
      console.log('age does not exist');
    }
    if (firstName && lastName && age) {
      const fullName = { firstName: firstName, lastName: lastName };
      localStorage.setItem('fullName', JSON.stringify(fullName));
      localStorage.setItem('age', age);
      location.href = 'gender.html';
    }
  });

  $('input').focus(function() {
    const label = $(`label[for=${$(this).attr('id')}]`);
    label.css('color', '#793b72');
  });

  $('input').focusout(function() {
    const label = $(`label[for=${$(this).attr('id')}]`);
    label.css('color', '#b4b4b4');
  });
});

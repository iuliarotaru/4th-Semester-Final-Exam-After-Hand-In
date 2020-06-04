$(document).ready(function() {
  $('#invested-before-yes').click(function() {
    localStorage.setItem('investedBefore', true);
    location.href = 'companies.html';
  });
  $('#invested-before-no').click(function() {
    localStorage.setItem('investedBefore', false);
    location.href = 'companies.html';
  });
});

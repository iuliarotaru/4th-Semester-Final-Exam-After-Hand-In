$(document).ready(function () {
    $("#female-gender").click(function () {
        localStorage.setItem("gender", "female")
        location.href = 'country.html';
    });
    $("#male-gender").click(function () {
        localStorage.setItem("gender", "male")
        location.href = 'country.html';
    });
});
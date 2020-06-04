$(document).ready(function () {
  let selectedPrefix = "+45";
  $("#prefix-select").change(function () {
    selectedPrefix = $(this).val();
  });
  let timeout = null;
  $("#phone-number").keyup(function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (isValidNumber(selectedPrefix, $("#phone-number").val())) {
        $("#next-button").removeAttr("disabled");
        $("#next-button").addClass("next-button-gradient");
        $("#next-button").removeClass("next-button-disabled");
      }
    }, 400);
  });

  $("#phone-number-form").submit(function (e) {
    e.preventDefault();
    const phoneNumber = $("#phone-number").val();
    if (!phoneNumber) {
      console.log("phone number does not exist");
    }
    if (phoneNumber) {
      const fullPhoneNumber = {prefix: selectedPrefix, number: phoneNumber}
      localStorage.setItem("phoneNumber", JSON.stringify(fullPhoneNumber));
      location.href = "invested-before.html";
    }
  });
  $("input, select").focus(function () {
    const label = $(`label[for=phone-number]`);
    label.addClass("label-focus");
  });

  $("input, select").focusout(function () {
    const label = $(`label[for=phone-number]`);
    label.removeClass("label-focus");
  });
});

const isValidNumber = (prefix, phoneNumber) => {
  let valid = false;
  switch (prefix) {
    case "+45":
      valid = phoneNumber.length === 8;
      break;
    case "+47":
      valid = phoneNumber.length === 8;
      break;
    case "+46":
      valid = phoneNumber.length >= 7 && phoneNumber.length <= 13;
      break;
    case "+358":
      valid = phoneNumber.length >= 5 && phoneNumber.length <= 12;
      break;
  }
  return valid;
};

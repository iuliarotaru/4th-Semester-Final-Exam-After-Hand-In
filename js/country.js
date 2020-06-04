$(document).ready(function() {
  let countries = [];
  let selectedCountry;

  fetch('countries.json')
    .then(response => response.json())
    .then(data => {
      countries = data.countries;
      selectedCountry = countries.find(country => country.name === 'Denmark');
      showBanks(selectedCountry.banks);
    });

  $('#country-select').on('change', function() {
    const countryValue = $(this).val();
    selectedCountry = countries.find(country => country.name === countryValue);
    showBanks(selectedCountry.banks);
  });

  let timeout = null;
  $('#bank-search').keyup(function() {
    clearTimeout(timeout);
    const search = $(this).val();
    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function() {
      const banks = selectedCountry.banks.filter(bank =>
        bank.name.toLowerCase().includes(search.toLowerCase())
      );
      showBanks(banks);
    }, 500);
  });

  $(document).on('click', '.bank-item', function(event) {
    const bank = $(this).data('bank');
    $('.country-selected-bank').removeClass('country-selected-bank');
    $(this).addClass('country-selected-bank');
    const selectedBank = { name: bank, country: selectedCountry.name };
    localStorage.setItem('bank', JSON.stringify(selectedBank));
    $('#next-button-country').removeAttr('disabled');
    $('#next-button-country').addClass('next-button-gradient');
    $('#next-button-country').removeClass('next-button-disabled');
  });

  $('#next-button-country').click(function() {
    location.href = 'phone-number.html';
  });
});

const showBanks = banks => {
  $('#banks-container').empty();
  banks.forEach(bank => {
    $('#banks-container').append(`
        <div class="bank-item pt-2" data-bank=${bank.name}>
            <img src="images/bank logos/${bank.logo}" class="country-bank-image"/> 
            <span class="country-bank-name">${bank.name}</span> 
        </div>`);
  });
};

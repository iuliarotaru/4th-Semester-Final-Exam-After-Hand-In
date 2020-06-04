$(function() {
  const userId = localStorage.getItem('userId');
  const sdg = localStorage.getItem('sdg');
  const fullName = JSON.parse(localStorage.getItem('fullName'));
  const age = localStorage.getItem('age');
  const gender = localStorage.getItem('gender');
  const phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
  const bank = JSON.parse(localStorage.getItem('bank'));
  const investedBefore = localStorage.getItem('investedBefore');
  
  console.log(`SDG: ${sdg}`);
  console.log(
    `First name: ${fullName.firstName}, Last name: ${fullName.lastName}`
  );
  console.log(`Age: ${age}`);
  console.log(`Gender: ${gender}`);
  console.log(
    `Phone Prefix: ${phoneNumber.prefix}, Phone Number: ${phoneNumber.number}`
  );
  console.log(`Bank name: ${bank.name}, Bank country: ${bank.country}`);
  console.log(`Invested before: ${investedBefore}`);

  const data = {
    userId: userId,
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    age: age,
    gender: gender,
    phonePrefix: phoneNumber.prefix,
    phoneNumber: phoneNumber.number,
    bankCountry: bank.country,
    bankName: bank.name,
    sdg: sdg.toString(),
    investedBefore: investedBefore
  };

  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://finalexam-365f.restdb.io/rest/investors-details',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-apikey': '5ecaba904a532801892ed724',
      'cache-control': 'no-cache'
    },
    processData: false,
    data: JSON.stringify(data)
  };

  $.ajax(settings)
    .done(function(response) {
      console.log(response);
    })
    .fail(function(error) {
      console.log('Data could not be saved to database.');
    });
});



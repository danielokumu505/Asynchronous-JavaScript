//Coding Challenge 1************************************
//this code is dependent on code from script.js and style.css
const WhereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      console.log(data);

      console.log(`Your are in ${data.city}, ${data.countryName}.`);

      getCountryData(data.countryName); //from script.js
    })
    .catch(error => console.error(`${error}. Unable to load resources`));

  //
};

WhereAmI(-20.6252, 46.24731);
WhereAmI(52.508, 13.381);
WhereAmI(19.037, 72.873);

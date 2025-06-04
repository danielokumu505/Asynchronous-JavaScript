'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  // countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};

//api change
//https://countries-api-836d.onrender.com/countries/

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v2/name/${country}`); //api endpoint

//   request.send(); //asynchronous

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); //refer to destructuring

//     console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   }); //AJAX calls happen asynchronously. the AJAX call that has the first request respondse
//   //... fires the load event first
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

/////////////////////////////////////////////////////////////////

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`); //api endpoint

  request.send(); //asynchronous

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); //refer to destructuring

    console.log(data);

    //render country 1
    renderCountry(data);

    //get neighbour country
    const neighbour = data.borders?.[0];

    if (!neighbour) {
      return;
    } //guard clause if country 1 has no neighbour

    //AJAX call country 2
    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); //api endpoint

    request2.send(); //asynchronous

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  }); //AJAX calls happen asynchronously. the AJAX call that has the first request respondse
  //... fires the load event first
};

// getCountryAndNeighbour('portugal');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       },1000);
//     },1000);
//   },1000);
// },1000);
//deep nesting : hard to maintain and difficult to understand and reason about hence more bugs , and difficult to add more features and functionality

//Promises and the fetch API************************************************************************************
//with
//Handling rejected promises*********************

// const fetchRequest = fetch(`https://restcountries.com/v2/name/portugal`);

// console.log(fetchRequest);//pending

// setTimeout(() => {
//   console.log(fetchRequest);//fullfilled after 3 seconds
// }, 3000);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //json also returns a new promise
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }

    return response.json();
  });
};

// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(
//       response => {
//         if (!response.ok) {
//           throw new Error(`Country not found (${response.status})`);
//         }

//         return response.json();
//       } //json also returns a new promise
//     )
//     .then(data => {
//       renderCountry(data[0]);

//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'djjkjkd';

//       if (!neighbour) {
//         return;
//       }

//       //country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); //must return fetch
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }

//       return response.json();
//     }) //must return response.json()
//     .then(data => {
//       renderCountry(data, 'neighbour');
//     })
//     .catch(error => {
//       console.error(`${error}`);
//       renderError(`Something went wrong. ${error.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     }); // finally runs whether the promise is fullfilled or rejected
// };

const getCountryData = function (country) {
  //country 1

  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(
      data =>
        //{
        {
          console.log(data);
          renderCountry(data[0]);
        }
      //   const neighbour = data[0].borders?.[0];

      //   if (!neighbour) {
      //     throw new Error('No neighbour found');
      //   }

      //   //country 2
      //   return getJSON(
      //     `https://restcountries.com/v2/alpha/${neighbour}`,
      //     'Country not found'
      //   );
      // })
      // .then(data => {
      //   renderCountry(data, 'neighbour');
      // }
    )
    .catch(error => {
      console.error(`${error}`);
      renderError(`Something went wrong. ${error.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); // finally runs whether the promise is fullfilled or rejected
};

//function(){fetch().then().then()}

btn.addEventListener('click', function () {
  getCountryData('australia');
});

////////////////////////////////////////////////////////////
//The event loop in practice*****************************
//microtask queue has priority over callback queue
//working with timers and promises together may delay timers since promises have a priority in the microtask queue 
//... over timers in the callback queue
console.log('Test start');
setTimeout(() => console.log(`0 seconds`), 0);
Promise.resolve('Resolved Promise 1').then(response => console.log(response));
Promise.resolve('Resolved Promise 2').then(response => {
  for (let x = 0; x < 1000000; x++) {}
  console.log(response);
});
console.log(`Test end`);

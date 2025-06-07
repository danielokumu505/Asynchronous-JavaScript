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

  countriesContainer.style.opacity = 1; //comment to enable coding challenge 1 to work
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1; //comment to enable coding challenge 1 to work
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
//The event loop in practice******************************************
//microtask queue has priority over callback queue
//working with timers and promises together may delay timers since promises have a priority in the microtask queue
//... over timers in the callback queue

// console.log('Test start');
// setTimeout(() => console.log(`0 seconds`), 0);
// Promise.resolve('Resolved Promise 1').then(response => console.log(response));
// Promise.resolve('Resolved Promise 2').then(response => {
//   for (let x = 0; x < 100000; x++) {}
//   console.log(response);
// });
// console.log(`Test end`);

//Building a simple promise*********************************************
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lottery draw is happening`);

//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win 💰'); //becomes response in then()
//     } else {
//       reject(new Error('You lost...')); //catched as an error in catch()
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(error => console.error(error));

//Promisifying : converting callback based asynchronous behavior into promise based asynchronous behavior

//Promisifying setTimeout()
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log(`Waited 1 seconds`);

//     return wait(1);
//   })
//   .then(() => {
//     console.log(`Waited 2 seconds`);

//     return wait(1);
//   })
//   .then(() => {
//     console.log(`Waited 3 seconds`);

//     return wait(1);
//   })
//   .then(() => {
//     console.log(`Waited 4 seconds`);
//   });

//reference
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

//fulfilling and rejecting promises immediately
// Promise.resolve('Resolved').then(response => {
//   console.log(response);
// });
// Promise.reject(new Error('Problem')).catch(error => {
//   console.error(error);
// });

//Promisifying the geolocation API*************************************************************

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // return navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(response => {
  // console.log(response.coords);
});

const WhereAmI = function () {
  // let lat, lng;
  getPosition()
    .then(response => {
      const { latitude: lat, longitude: lng } = response.coords; //refer to destructuring

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      // console.log(data);

      // console.log(`Your are in ${data.city}, ${data.countryName}.`);

      getCountryData(data.countryName);
    })
    .catch(error => console.error(`${error}. Unable to load resources`));

  //
};

// WhereAmI();

//Consuming promises with async/await*******************************************************
//Error handling with try/catch*******************************************************
//async turns a regular function into an asynchronous function

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

const WhereAmIasync = async function () {
  try {
    //geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    //reverse geocoding
    const geocodeResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );

    if (!geocodeResponse.ok) {
      throw new Error('Problem getting location data');
    }

    const geocodeData = await geocodeResponse.json();

    const response = await fetch(
      `https://restcountries.com/v2/name/${geocodeData.countryName}`
    );

    if (!response.ok) {
      console.log(response.status);
      throw new Error('Problem getting country');
    }

    const data = await response.json();

    renderCountry(data[0]);

    return `You are in ${geocodeData.city}, ${geocodeData.countryName}`;
  } catch (error) {
    console.error(`${error}`);
    renderError(error.message);

    //rethrowing error to reject promise reuturned from async function**
    throw error;
  }
};

// console.log('Will get location');
// console.log(WhereAmIasync());
// WhereAmIasync()
//   .then(returnedValue => {
//     console.log(`2 : ${returnedValue}`);
//   })
//   .catch(error => {
//     console.error(`${error}`);
//   })
//   .finally(() => {
//     console.log('Finished getting location');
//   });

// (async function () {
//   try {
//     const returnedValue = await WhereAmIasync();
//     console.log(`2 : ${returnedValue}`);
//   } catch (error) {
//     console.error(`${error}`);
//   }
//   console.log('Finished getting location');
// })();

// try {
//   let x = 2;
//   const y = 3;
//   x = 6;
// } catch (error) {
//   alert(error.message);
// }

//Running Promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    //the data is fetched in sequence : one after another, uses more time
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);

    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);

    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]); //takes in an array of promises and returns them at the same time

    //note : when one promise rejects, the whole promise.all() rejects

    console.log(data);

    console.log(data.map(array => array[0].capital));
  } catch (error) {
    console.error(error);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

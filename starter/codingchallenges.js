//Coding Challenge 1************************************
//this code is dependent on code from script.js and style.css
// const WhereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);

//       console.log(`Your are in ${data.city}, ${data.countryName}.`);

//       getCountryData(data.countryName); //from script.js
//     })
//     .catch(error => console.error(`${error}. Unable to load resources`));

//   //
// };

// WhereAmI(-20.6252, 46.24731);
// WhereAmI(52.508, 13.381);
// WhereAmI(19.037, 72.873);

//Coding challenge 2*****************************************
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');

createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imageContainer.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(new Error(`Image not found`));
    });
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(response => {
    currentImage = response;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(response => {
    currentImage = response;
    console.log(`Image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(error => console.error(error));
// starter\img\img-1.jpg

const sectionLocationChangingText = document.querySelector(
  ".section-location-changing-text"
);
const locateMeBtn = document.querySelector(".locate-me-btn");
const formLocationBtn = document.querySelector(".form-location-btn");
const formLocationInput = document.querySelector(".form-location-input");

const changingText = [
  "Hungry?",
  "Late Night at office?",
  "Unexpected Guests?",
  "Cooking gone wrong?",
];
let i = 0;
setInterval(function () {
  if (i >= 4) {
    i = 0;
  }
  sectionLocationChangingText.textContent = changingText[i];
  i++;
}, 2000);

// Function to access user location
const successCallback = async function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // console.log(lat, lon);
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
  const city = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.city;
    })
    .catch((error) => console.log(error));
  // console.log(city);
  window.location.href = `/location/${city}`;
};
const errorCallback = function (err) {
  alert(`can't access your location`);
};
getLocation = function () {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

locateMeBtn.addEventListener("click", getLocation);

formLocationBtn.addEventListener("click", function () {
  if (formLocationInput.value != "") {
    window.location.href = `/location/${formLocationInput.value}`;
  }
});

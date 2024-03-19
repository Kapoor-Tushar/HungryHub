// Selecting elements
const locationText = document.querySelector(".header-loaction-text");
const loactionModal = document.querySelector(
  ".loaction-modal-window-container"
);
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn-close-modal");
const gpsBtn = document.querySelector(".Gps-btn");
const modalLocationInputText = document.querySelector(
  ".modal-location-input-text"
);
const modalFormLocationBtn = document.querySelector(".modal-form-location-btn");
const form = document.querySelector(".modal-location-form-container");

// Functions for opening and closing modal window
const openModal = function (e) {
  e.preventDefault();
  loactionModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  loactionModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Function to access user location
const successCallback = async function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
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

// adding functionality to open and close modal window
locationText.addEventListener("click", function (e) {
  openModal(e);
});
closeBtn.addEventListener("click", closeModal);

//adding auto location detection on clicking gps btn
gpsBtn.addEventListener("click", getLocation);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (modalLocationInputText.value != "") {
    window.location.href = `/location/${modalLocationInputText.value}`;
  }
});

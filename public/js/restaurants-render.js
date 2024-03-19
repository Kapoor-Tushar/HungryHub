const restaurantTemplateCard = document.querySelectorAll(
  ".restaurant-template-card"
);
const cartView = document.querySelector(".cart");

// Enabling click functionality on each restaurant card.
restaurantTemplateCard.forEach(function (restaurant) {
  restaurant.addEventListener("click", function () {
    // Selecting the shop name and loaction
    shopName = restaurant.querySelector(".shop-name");
    shopLocation = restaurant.querySelector(".shop-location");
    window.location.href = `/restaurant/${shopName.innerHTML}-${shopLocation.innerHTML}`;
  });
});

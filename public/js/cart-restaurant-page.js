const addItemBtn = document.querySelectorAll(".add-item");
const increaseItemBtn = document.querySelectorAll(".increase-item");
const decreaseItemBtn = document.querySelectorAll(".decrease-item");
const cartView = document.querySelector(".cart");
const cartConatiner = document.querySelector(".cart-conatiner");
const cartDataDiv = document.querySelector(".cart-data-div");
const emptyCartDiv = document.querySelector(".empty-cart-div");
const checkoutDiv = document.querySelector(".checkout-div");
let cart = [];

const addToCart = function (itemObj) {
  const existingItem = cart.find(function (cartItem) {
    return cartItem.Name === itemObj.Name;
  });
  //   console.log(existingItem);
  if (existingItem) {
    // If item is already in the cart, update quantity
    existingItem.quantity += 1;
  } else {
    // If item is not in the cart, add it
    cart.push({ ...itemObj, quantity: 1 });
  }
};
const removeFromCart = function (itemObj) {
  const existingItem = cart.find(function (cartItem) {
    return cartItem.Name === itemObj.Name;
  });
  //   console.log(existingItem);
  if (existingItem) {
    // If item is already in the cart, update quantity
    existingItem.quantity -= 1;
  }
};
const updateCartDisplay = function (parentEle) {
  for (let i = 0; i < cart.length; i++) {
    //   console.log(cart[i]);
    parentEle.children[6].children[1].innerHTML = cart[i].quantity;
    if (cart[i].quantity == 0) {
      parentEle.children[6].classList.add("hidden");
      parentEle.children[5].classList.remove("hidden");
      const halfBeforeDeletedEle = cart.slice(0, i);
      const halfAfterDeletedEle = cart.slice(i + 1, cart.length + 1);
      cart = halfBeforeDeletedEle.concat(halfAfterDeletedEle);
    }
  }
};

const updateCartView = function () {
  //   console.log(cartDataDiv);
  while (cartDataDiv.firstChild) {
    cartDataDiv.removeChild(cartDataDiv.firstChild);
  }
  for (let i = 0; i < cart.length; i++) {
    // console.log(cart[i]);
    const divNameQuantity = document.createElement("div");
    divNameQuantity.classList.add("cart-item-name-quantity");
    const spanName = document.createElement("span");
    const spanQuantity = document.createElement("span");
    const spanNameText = document.createTextNode(cart[i].Name);
    const spanQuantityText = document.createTextNode(cart[i].quantity);
    spanName.appendChild(spanNameText);
    spanQuantity.appendChild(spanQuantityText);
    spanName.classList.add("cart-view-item-name");
    spanQuantity.classList.add("cart-view-item-quantity");
    divNameQuantity.appendChild(spanName);
    divNameQuantity.appendChild(spanQuantity);
    const divPrice = document.createElement("div");
    const divPriceText = document.createTextNode(`₹ ${cart[i].Price}`);
    divPrice.appendChild(divPriceText);
    divPrice.classList.add("cart-view-item-price");
    cartDataDiv.appendChild(divNameQuantity);
    cartDataDiv.appendChild(divPrice);
    const breakAfter = document.createElement("br");
    cartDataDiv.appendChild(breakAfter);
    // console.log(cartConatiner);
  }
};
const checkoutBtnDisplay = function () {
  let totalquantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalquantity += cart[i].quantity;
  }
  if (totalquantity === 0) {
    if (checkoutDiv) {
      document.querySelector(".checkout-div").classList.add("hidden");
    } else if (!checkoutDiv) {
      document.querySelector(".checkout-login-div").classList.add("hidden");
    }
  } else {
    if (checkoutDiv) {
      document.querySelector(".checkout-div").classList.remove("hidden");
      document.querySelector(".sup-text").innerHTML = totalquantity;
    } else if (!checkoutDiv) {
      document.querySelector(".checkout-login-div").classList.remove("hidden");
    }
  }
};
addItemBtn.forEach(function (item, i) {
  item.addEventListener("click", function (e) {
    // console.log(e);
    const parentEle = e.target.parentElement;
    const itemName = parentEle.children[1].innerHTML;
    const itemPrice = parentEle.children[2].innerHTML;
    selectedItem = { Name: itemName, Price: Number(itemPrice.split(" ")[1]) };
    // console.log(parentEle);
    addToCart(selectedItem);
    updateCartDisplay(parentEle);
    parentEle.children[6].classList.remove("hidden");
    parentEle.children[5].classList.add("hidden");
    // console.log(selectedItem);
    updateCartView();
    checkoutBtnDisplay();
  });
});

increaseItemBtn.forEach(function (item, i) {
  item.addEventListener("click", function (e) {
    const parentEle = e.target.parentElement;
    const grandParentEle = parentEle.parentElement;
    const itemName = grandParentEle.children[1].innerHTML;
    const itemPrice = grandParentEle.children[2].innerHTML;
    selectedItem = { Name: itemName, Price: itemPrice };
    addToCart(selectedItem);
    updateCartDisplay(grandParentEle);
    updateCartView();
    checkoutBtnDisplay();
  });
});

decreaseItemBtn.forEach(function (item, i) {
  item.addEventListener("click", function (e) {
    const parentEle = e.target.parentElement;
    const grandParentEle = parentEle.parentElement;
    const itemName = grandParentEle.children[1].innerHTML;
    const itemPrice = grandParentEle.children[2].innerHTML;
    selectedItem = { Name: itemName, Price: itemPrice };
    removeFromCart(selectedItem);
    updateCartDisplay(grandParentEle);
    updateCartView();
    checkoutBtnDisplay();
  });
});
cartView.addEventListener("mouseover", function () {
  cartConatiner.classList.remove("hidden");
  if (cart.length == 0) {
    emptyCartDiv.classList.remove("hidden");
  } else {
    emptyCartDiv.classList.add("hidden");
    // console.log(cartDataDiv);
  }
});
cartView.addEventListener("mouseout", function () {
  cartConatiner.classList.add("hidden");
});

if (checkoutDiv) {
  checkoutDiv.addEventListener("click", function () {
    const shopName = document.querySelector(".restaurant-name").innerHTML;
    const shopAddress = document.querySelector(
      ".restaurant-location"
    ).innerHTML;
    const cartDataString = JSON.stringify(cart);
    // console.log(cartDataString);

    // Storing the data into the cookies
    document.cookie = `shopName=${encodeURIComponent(
      shopName
    )}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/;`;
    document.cookie = `shopAddress=${encodeURIComponent(
      shopAddress
    )}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/;`;
    document.cookie = `cartData=${encodeURIComponent(
      cartDataString
    )}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/;`;

    // Redirect to the checkout page
    window.location.href = "/checkout";
  });
}
if (document.querySelector(".checkout-login-div")) {
  document
    .querySelector(".checkout-login-div")
    .addEventListener("click", function () {
      window.location.href = "/login";
    });
}

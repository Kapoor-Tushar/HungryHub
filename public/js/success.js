const getCookie = function (name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
window.onload = function () {
  const startTimer = function () {
    let i = 1;
    setInterval(function () {
      if (i < 10) {
        document.querySelector(".order_placed-status-tick").innerHTML = i;
        i++;
      } else if (i >= 10 && i < 20) {
        document
          .querySelector(".order_confirmed-details")
          .classList.remove("hidden");
        document.querySelector(".order_placed-status-tick").innerHTML =
          "&#10004";
        document.querySelector(".order_confirmed-status-tick").innerHTML = i;
        i++;
      } else if (i >= 20 && i < 35) {
        document
          .querySelector(".order_processed-details")
          .classList.remove("hidden");
        document.querySelector(".order_confirmed-status-tick").innerHTML =
          "&#10004";
        document.querySelector(".order_processed-status-tick").innerHTML = i;
        i++;
      } else if (i >= 35 && i < 45) {
        document
          .querySelector(".order_pickup-details")
          .classList.remove("hidden");
        document.querySelector(".order_processed-status-tick").innerHTML =
          "&#10004";
        document.querySelector(".order_pickup-status-tick").innerHTML = i;
        i++;
      } else if (i >= 45 && i < 55) {
        document
          .querySelector(".order_delivered-details ")
          .classList.remove("hidden");
        document.querySelector(".order_pickup-status-tick").innerHTML =
          "&#10004";
        document.querySelector(".order_delivered-status-tick").innerHTML = i;
        i++;
      } else if (i >= 55 && i < 60) {
        document
          .querySelector(".order_delivered-sub_heading")
          .classList.remove("hidden");
        document.querySelector(".order_delivered-status-tick").innerHTML =
          "&#10004";
        i++;
      } else if (i === 60) {
        console.log(i);
        clearInterval(startTimer);
        window.location.href = "/";
      } else {
        i++;
      }
    }, 1000);
  };
  const updateView = function () {
    const getCookie = function (name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    };
    const cartDataString = decodeURIComponent(getCookie("cartData"));
    const cartData = JSON.parse(cartDataString);
    console.log(cartData);
    cartData.forEach((item) => {
      const orderDetailsDivNameQuantity = document.createElement("div");
      orderDetailsDivNameQuantity.classList.add(
        "order-details-div-name-quantity"
      );

      const orderDetailsSpanName = document.createElement("span");
      orderDetailsSpanName.classList.add("order-details-span-name");
      const orderDetailsSpanNameText = document.createTextNode(`${item.Name}`);
      orderDetailsSpanName.appendChild(orderDetailsSpanNameText);

      const orderDetailsSpanQuantity = document.createElement("span");
      orderDetailsSpanName.classList.add("order-details-span-quantity");
      const orderDetailsSpanQuantityText = document.createTextNode(
        `${item.quantity}`
      );
      orderDetailsSpanQuantity.appendChild(orderDetailsSpanQuantityText);

      orderDetailsDivNameQuantity.appendChild(orderDetailsSpanName);
      orderDetailsDivNameQuantity.appendChild(orderDetailsSpanQuantity);

      const orderDetailsDivPrice = document.createElement("div");
      orderDetailsDivPrice.classList.add("order-details-div-price");
      const orderDetailsDivPriceText = document.createTextNode(
        `₹ ${item.Price}`
      );
      orderDetailsDivPrice.appendChild(orderDetailsDivPriceText);

      document
        .querySelector(".order-details-div_container")
        .appendChild(orderDetailsDivNameQuantity);
      document
        .querySelector(".order-details-div_container")
        .appendChild(orderDetailsDivPrice);
    });
    const grandTotalPriceDiv = document.createElement("div");
    grandTotalPriceDiv.classList.add("grand-total_price-div");
    const grandTotalPriceHeadingSpan = document.createElement("span");
    grandTotalPriceHeadingSpan.classList.add("grand-total-price-heading-span");
    console.log(document.cookie);
    console.log(document.cookie);
    const grandTotalPriceHeadingSpanText = document.createTextNode(
      `Total Amount Paid is ₹ ${decodeURIComponent(getCookie("GrandTotal"))}`
    );
    grandTotalPriceHeadingSpan.appendChild(grandTotalPriceHeadingSpanText);
    grandTotalPriceDiv.appendChild(grandTotalPriceHeadingSpan);
    document
      .querySelector(".order-details-div_container")
      .appendChild(grandTotalPriceDiv);
  };
  updateView();
  startTimer();
};

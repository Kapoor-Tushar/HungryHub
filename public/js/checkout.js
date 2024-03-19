const restaurantName = document.querySelector(".checkout-rest_name-div");
const checkoutCartItemDetailsDiv = document.querySelector(
  ".checkout-cart-item-details-div"
);
const checkoutBillSummaryItemNamePriceQuantDiv = document.querySelector(
  ".checkout-bill_summary-item_name_price_quant-div"
);
const checkoutBillSummaryGstPriceSpan = document.querySelector(
  ".checkout-bill_summary-gst-price-span"
);
const checkoutBillSummaryPlatformFeePriceSpan = document.querySelector(
  ".checkout-bill_summary-platform_fee-price-span"
);
const checkoutBillSummaryTotalPriceSpan = document.querySelector(
  ".checkout-bill_summary-total-price-span"
);
const checkoutBtnFinalAmountSpan = document.querySelector(
  ".checkout-btn-final-amount-span"
);
const checkoutBillSummaryTotalPriceWithoutTaxSpan = document.querySelector(
  ".checkout-bill_summary-total-price-without-tax-span"
);
const checkoutPlaceorderBtn = document.querySelector(
  ".checkout-placeorder-btn"
);

const getCookie = function (name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
const shopName = decodeURIComponent(getCookie("shopName"));
const shopAddress = decodeURIComponent(getCookie("shopAddress"));
const cartDataString = decodeURIComponent(getCookie("cartData"));
const cartData = JSON.parse(cartDataString);

let totalCartPrice = 0;
let grandTotal = 0;

const updateView = function () {
  restaurantName.innerHTML = `${shopName} - ${shopAddress}`;
  cartData.forEach(function (item) {
    const divRestItemNameQuant = document.createElement("div");
    divRestItemNameQuant.classList.add("checkout-rest_item_name_quant-div");
    const spanRestItemName = document.createElement("span");
    spanRestItemName.classList.add("checkout-rest_item_name-span");
    const spanRestItemNameText = document.createTextNode(`${item.Name}`); // add item name
    spanRestItemName.appendChild(spanRestItemNameText);
    const spanRestItemQuant = document.createElement("span");
    spanRestItemQuant.classList.add("checkout-rest_item_quant-span");
    const spanRestItemQuantText = document.createTextNode(`${item.quantity}`); //add item quant
    spanRestItemQuant.appendChild(spanRestItemQuantText);
    divRestItemNameQuant.appendChild(spanRestItemName);
    divRestItemNameQuant.appendChild(spanRestItemQuant);
    const divRestItemPrice = document.createElement("div");
    divRestItemPrice.classList.add("checkout-rest_item_price-div");
    const divRestItemPriceText = document.createTextNode(`₹ ${item.Price}`); // add item price
    divRestItemPrice.appendChild(divRestItemPriceText);
    checkoutCartItemDetailsDiv.appendChild(divRestItemNameQuant);
    checkoutCartItemDetailsDiv.appendChild(divRestItemPrice);
    // <div class="checkout-bill_summary-item_name_price-div">
    //     <span class="checkout-bill_summary-item_name-span">Item Name</span
    //     ><span class="checkout-bill_summary-item_name-price-span">Price</span>
    //   </div>
    //   <div class="checkout-bill_summary-quant-div">Item Quantity</div>
    const divBillItemNamePrice = document.createElement("div");
    divBillItemNamePrice.classList.add(
      "checkout-bill_summary-item_name_price-div"
    );
    const spanBillItemName = document.createElement("span");
    spanBillItemName.classList.add("checkout-bill_summary-item_name-span");
    const spanBillItemNameText = document.createTextNode(`${item.Name}`); // add item name
    spanBillItemName.appendChild(spanBillItemNameText);
    const spanBillItemPrice = document.createElement("span");
    spanBillItemPrice.classList.add(
      "checkout-bill_summary-item_name-price-span"
    );
    const spanBillItemPriceText = document.createTextNode(`₹ ${item.Price}`); //add item quant
    spanBillItemPrice.appendChild(spanBillItemPriceText);
    divBillItemNamePrice.appendChild(spanBillItemName);
    divBillItemNamePrice.appendChild(spanBillItemPrice);
    const divBillItemQuant = document.createElement("div");
    divBillItemQuant.classList.add("checkout-bill_summary-quant-div");
    const divBillItemQuantText = document.createTextNode(`(${item.quantity})`); // add item price
    divBillItemQuant.appendChild(divBillItemQuantText);
    checkoutBillSummaryItemNamePriceQuantDiv.appendChild(divBillItemNamePrice);
    checkoutBillSummaryItemNamePriceQuantDiv.appendChild(divBillItemQuant);

    totalCartPrice += item.Price * item.quantity;
  });
  checkoutBillSummaryTotalPriceWithoutTaxSpan.innerHTML = `₹ ${totalCartPrice}`;
  checkoutBillSummaryGstPriceSpan.innerHTML = `₹ ${
    (totalCartPrice * 18) / 100
  }`;
  checkoutBillSummaryPlatformFeePriceSpan.innerHTML = `₹ ${
    (totalCartPrice * 5) / 100
  }`;
  grandTotal =
    totalCartPrice +
    40 +
    (totalCartPrice * 18) / 100 +
    (totalCartPrice * 5) / 100;
  checkoutBillSummaryTotalPriceSpan.innerHTML = `₹ ${grandTotal}`;
  checkoutBtnFinalAmountSpan.innerHTML = `₹ ${grandTotal} Place order`;
  // console.log(totalCartPrice);
};

updateView();

const payments = async function () {
  const session = await axios({
    method: "GET",
    url: "/checkout/payments",
  });
  // console.log(session);
  const stripe = Stripe(
    "pk_test_51OaXC9SJsWasuI4U7VyrqOU1OyUl4OZiymvG3FAAwUSQBI6cVzyt1LM9cEXxMKRXsYxKMVwJevdqvmhW3NZ7JDgR00ImqivZDX"
  );
  await stripe.redirectToCheckout({
    sessionId: session.data.session.id,
  });
};
checkoutPlaceorderBtn.addEventListener("click", function () {
  // Storing the total amount into the cookies
  document.cookie = `GrandTotal=${encodeURIComponent(
    grandTotal
  )}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/;`;
  payments();
});

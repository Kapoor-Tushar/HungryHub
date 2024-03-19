const stripe = require("stripe")("Connection-String");
exports.getPage = async function (req, res, next) {
  try {
    res.status(200).render("checkout", { locals: res.locals });
  } catch (err) {
    res.render("error", {
      ErrorCode: 404,
      ErrorStatus: "Fail",
      ErrorMessage: err,
    });
  }
};
exports.getSuccessPage = async function (req, res, next) {
  try {
    res.status(200).render("success");
  } catch (err) {
    res.render("error", {
      ErrorCode: 404,
      ErrorStatus: "Fail",
      ErrorMessage: err,
    });
  }
};

exports.getFailPage = async function (req, res, next) {
  try {
    res.status(200).render("fail");
  } catch (err) {
    res.render("error", {
      ErrorCode: 404,
      ErrorStatus: "Fail",
      ErrorMessage: err,
    });
  }
};

exports.getPaymentsPage = async function (req, res, next) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_email: req.user.email,
      line_items: [
        // Add your line items based on the items in the cart
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${req.cookies.shopName}`,
              description: `${req.cookies.shopAddress}`,
            },
            unit_amount: parseFloat(req.cookies.GrandTotal) * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/checkout/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/checkout/fail`,
    });
    // Create session as response
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.render("error", {
      ErrorCode: 404,
      ErrorStatus: "Fail",
      ErrorMessage: err,
    });
  }
};

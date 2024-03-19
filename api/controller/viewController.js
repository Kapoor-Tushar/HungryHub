const { ConnectionReadyEvent } = require("mongodb");
const Shop = require("./../model/shopModel");
exports.getHomePage = async function (req, res, next) {
  try {
    res.status(200).render("home");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOverviewPage = async function (req, res, next) {
  try {
    // Extracting city entered or automatically identified by the gps.
    // console.log(req.params.place);
    let data = {
      cityName: req.params.city[0].toUpperCase() + req.params.city.slice(1),
    };
    // console.log(data);
    // Extracting shop data .
    const shops = await Shop.find({ location: data.cityName });
    // console.log(shops);

    res.status(200).render("overview", { data: data, shops: shops });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getLoginPage = function (req, res) {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getSignupPage = function (req, res) {
  try {
    res.status(200).render("signup");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getProfilePage = function (req, res, next) {
  try {
    res.status(200).render("profile");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message,
    });
  }
};
exports.getItemPage = async function (req, res, next) {
  try {
    // req.params provides us with area loaction and item searched.
    // console.log(req.params.location);
    // Fisrt find shop in the given location
    let shops = await Shop.find({ location: req.params.location });
    let data = [];
    shops.forEach(function (shop, i) {
      shop.menu[0].items.forEach(function (item, i) {
        if (
          item.category.toLowerCase().includes(req.params.item.toLowerCase())
        ) {
          // shop[i];
          if (!data.includes(shop)) {
            data.push(shop);
          }
        }
      });
    });
    // console.log(data);
    // Second, In the shop menu find if the item present in the url is present of not.
    // third, if the item is present then render all the restaurants with given item.
    // Keep the format of rendered webiste same as that of overview.js
    res.status(200).render("restItemOverview", {
      data: req.params.location,
      shops: data,
      category: req.params.item,
    });
  } catch (err) {
    res.status(404).json({
      status: "fial",
      message: err.message,
    });
  }
};
exports.getHelpPage = function (req, res, next) {
  try {
    res.status(200).render("help");
  } catch (err) {
    res.status(404).json({
      status: "fial",
      message: err.message,
    });
  }
};

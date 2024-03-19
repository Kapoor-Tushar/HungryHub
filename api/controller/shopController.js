const Shop = require("./../model/shopModel");

exports.getAllShops = async function (req, res) {
  try {
    const shops = await Shop.find();
    res.status(200).json({
      status: "success",
      results: shops.length,
      data: {
        shops: shops,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getShop = async function (req, res) {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        shop: shop,
      },
    });
  } catch (err) {}
};
exports.createShop = async function (req, res) {
  try {
    const newShop = await Shop.create(req.body);
    res.status(201).json({
      status: "success",
      shop: newShop,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteShop = async function (req, res) {
  try {
    await Shop.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

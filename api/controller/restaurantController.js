const Shop = require("./../model/shopModel");

// Function for rendering menu page of the restaurant
exports.restOverview = async function (req, res) {
  try {
    // accesing shop name and loaction
    const shopName = req.params.locationName.split("-")[0];
    const shopLocation = req.params.locationName.split("-")[1];
    // finding the shop from its name and loaction in the database.
    const shop = await Shop.find({
      name: shopName,
      location: shopLocation,
    });
    res
      .status(200)
      .render("restOverview", { data: shop[0], location: shopLocation });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

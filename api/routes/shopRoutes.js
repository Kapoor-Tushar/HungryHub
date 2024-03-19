const express = require("express");
const router = express.Router();

const shopController = require("./../controller/shopController");
const authController = require("./../controller/authController");

router
  .route("/")
  .get(shopController.getAllShops)
  .post(shopController.createShop);
router
  .route("/:id")
  .get(shopController.getShop)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "shopkepper"),
    shopController.deleteShop
  );

module.exports = router;

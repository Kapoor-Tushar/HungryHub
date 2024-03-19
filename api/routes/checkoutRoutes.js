const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");
const checkoutController = require("./../controller/checkoutController");

router.get(
  "/",
  authController.isLoggedIn,
  authController.protect,
  checkoutController.getPage
);
router.get(
  "/payments",
  authController.protect,
  checkoutController.getPaymentsPage
);
router.get(
  "/success",
  authController.protect,
  checkoutController.getSuccessPage
);
router.get("/fail", authController.protect, checkoutController.getFailPage);
module.exports = router;

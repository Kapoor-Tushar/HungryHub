const express = require("express");
const router = express.Router();
const viewController = require("./../controller/viewController");
const authController = require("./../controller/authController");

router.use(authController.isLoggedIn);

router.get("/", viewController.getHomePage);
router.get("/location/:city", viewController.getOverviewPage);
router.get("/login", viewController.getLoginPage);
router.get("/signup", viewController.getSignupPage);
router.get("/profile", authController.protect, viewController.getProfilePage);
router.get("/collections/:location/:item", viewController.getItemPage);
router.get("/help", viewController.getHelpPage);
module.exports = router;

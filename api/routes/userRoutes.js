const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logOut);

router.patch("/updateMe", authController.protect, authController.updateMe);
router.delete("/deleteMe", authController.protect, authController.deleteMe);
module.exports = router;

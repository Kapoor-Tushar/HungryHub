const express = require("express");
const router = express.Router();

const menuController = require("./../controller/menuController");

router.route("/").get(menuController.getMenu).post(menuController.createMenu);

module.exports = router;

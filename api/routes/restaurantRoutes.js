const express = require("express");
const router = express.Router();
const restaurantController = require("./../controller/restaurantController");

router.route("/:locationName").get(restaurantController.restOverview);
module.exports = router;

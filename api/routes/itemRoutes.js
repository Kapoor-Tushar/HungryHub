const express = require("express");
const router = express.Router();

const itemController = require("./../controller/itemController");

router
  .route("/")
  .get(itemController.getAllItem)
  .post(itemController.createItem);

module.exports = router;

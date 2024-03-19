const mongoose = require("mongoose");
const Menu = require("./menuModel");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food item must have a name."],
      trim: true,
    },
    //   item price
    price: {
      type: Number,
      required: [true, "Price must be defined for the item"],
    },
    // item description
    itemDescription: {
      type: String,
      required: [true, "Please describe the food item"],
      maxLength: 200,
    },
    // item photo
    itemImage: {
      type: String,
    },
    // item category
    category: {
      type: String,
      required: [true, "Please provide the category of the food item"],
      maxLength: 30,
    },
    cuisineType: {
      type: String,
      enum: ["pure_vegetarian", "non_vegetarian", "both"],
      required: true,
      default: "pure_vegtarian",
    },
    // Implementing parent referencing with menu & shop
    menu: {
      type: mongoose.Schema.ObjectId,
      ref: "Menu",
      required: [true, "Item must be associated to a menu"],
    },
  },
  // This will ensure that :-
  // By setting { virtuals: true }, you ensure that when you convert a Mongoose document to JSON or a plain object, any virtual fields you've defined will be included in the output.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

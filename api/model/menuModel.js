const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    FSSAILicenceNumber: {
      type: Number,
      required: [true, "FSSAI Licence Number is required"],
    },
    GSTNumber: {
      type: String,
      required: [true, "GST Number is required"],
    },
    PanCardNumber: {
      type: String,
      required: [true, "Pan card Number is required"],
    },
    shop: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
      required: [true, "Shop id must be defined"],
    },
  },
  // This will ensure that :-
  // By setting { virtuals: true }, you ensure that when you convert a Mongoose document to JSON or a plain object, any virtual fields you've defined will be included in the output.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Making a connection between menu and items
// Applying vitual populate
menuSchema.virtual("items", {
  ref: "Item",
  foreignField: "menu",
  localField: "_id",
});
menuSchema.pre(/^find/, function (next) {
  this.populate({
    path: "items",
    select: "-__v",
  });
  next();
});
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;

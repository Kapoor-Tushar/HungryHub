const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A restaurant must have a name."],
      trim: true,
      maxLength: [
        40,
        "A restaurant name must have less than or equal to 40 characters",
      ],
    },
    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      // set: (val)=>Math.round(val*10)/10
    },
    typeOfRestaurant: {
      type: String,
      required: [true, "A restaurant must have a type."],
    },
    location: {
      type: String,
      required: true,
    },
    shopCompleteAddress: {
      type: String,
      required: [true, "Please specify shop complete address."],
    },

    imageCover: {
      type: String,
      required: [true, "A restaurant must have a cover image"],
    },
    priceDiscount: {
      type: Number,
    },
    AvgTimeForOrderProcess: {
      type: Number,
      required: [
        true,
        "A restaurant must mention avg time for order preperation in minutes.",
      ],
    },
    costForTwo: {
      type: Number,
      required: [true, "Please provide avg order value for two people"],
    },
    outletTimings: {
      openingTime: {
        type: Number,
      },
      closingTime: {
        type: Number,
      },
    },
  },
  // This will ensure that :-
  // By setting { virtuals: true }, you ensure that when you convert a Mongoose document to JSON or a plain object, any virtual fields you've defined will be included in the output.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Making a connection between shop and menu item
// Applying vitual populate
shopSchema.virtual("menu", {
  ref: "Menu",
  foreignField: "shop",
  localField: "_id",
});
shopSchema.pre(/^find/, function (next) {
  this.populate({
    path: "menu",
    select: "-__v",
  });
  next();
});
const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;

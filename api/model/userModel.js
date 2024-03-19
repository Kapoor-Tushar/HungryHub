// This file will contain user schema, which is required for authorisation and authentication purpose.
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please mention your name."],
  },
  email: {
    type: String,
    required: [true, "Please mention your email-id."],
    // We want all the email-ids to be unique
    unique: true,
    // It will convert the email address to lowercase if in case someone has enetered capital letters.
    lowercase: true,
    // Validating the email id. We will be using validator package present in node for this.
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    // Defining a set of values which could only be taken as input.
    enum: ["admin", "user", "shopkepper"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please mention your desired password."],
    minLength: 8,
    // We don't want to display this field if the client accesses all user data.
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please re-enter your typed password."],
    // validating password and passwordConfirm, it checks whether the two fields are same or not.
    validate: {
      // This only works with create and save methods in mongoose.
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordChangedAt: Date,
  // These two fields are being used in forgot password
  passwordResetToken: String,
  passwordResetExpires: Date,
  // This field indicates if the user is still in use or he/she has deleted his/her account.
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Implemnting encryption, till now we have been storing our passwords in plain text format but now we will be encrypting these passwords.
// For this we will be using document middleware. It runs between the data and saving it ti the database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hashing our password with the help of bcrypt.
  // Here we have used the async version of hash function, which will return us a promise, which we are required to await.
  // Hashing the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Deleting the passwordConfirm field.
  // passwordConfirm was only required to make sure that the password enetered by the user is correct, after that this field is of no use to us.
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  } else {
    // We have subtracted 1000 milliseconds as sometimes token is generated before this time stamp which may cause the user to not log into the appliaction.
    this.passwordChangedAt = Date.now() - 1000;
    next();
  }
});

// Implementing query middleware for deleteUser account. We have used a regular expression here
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Creating instance method to check passowrd and passwordConfirm
userSchema.methods.correctPassword = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

// Creating instance method if the password is changed.
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Creating a instance method to create a random reset token.
userSchema.methods.createPasswordResetToken = function () {
  // We are creating this resetToken so that the user can create a new password with the help of this.
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

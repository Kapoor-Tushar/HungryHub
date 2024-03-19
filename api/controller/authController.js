// This file will constin all the necessary code required for authentication.

const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Enabling signup functionality.
exports.signup = async function (req, res, next) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    });
    // Removing the password from the output
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Enabling login functionality.
exports.login = async function (req, res, next) {
  try {
    // Accessing email and password field.
    const email = req.body.email;
    const password = req.body.password;

    // 1)check if email and passsword exist.
    if (!email || !password) {
      throw "Please enter the email and password correctly.";
    }
    // 2) Check if the user exist and the password is correct.
    // Here we are also selecting the password field as previously we have removed that field.
    const user = await User.findOne({ email: email }).select("+password");
    // For verifying the current paswword with the password stored in the database, we need to againg encrypt the current entered password and then compare it with the password stored in the database. WE do this as we can't decrypt the encrypted password.
    // For this we have used instance method, that we have defined in userModel.
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw "Incorrect email or password";
    }
    // 3)If everything is ok, send the token.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // Sending token to the browser in the for of the cookie.
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

// We have implemented protected route on deletion of shop.
exports.protect = async function (req, res, next) {
  try {
    // 1) Getting token and check if it is there.
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // console.log(token);
    if (!token) {
      throw "You are not logged in. Please log in to get the access.";
    }

    // 2) verifying the token
    //   We have promisified this function
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // 3) Check if the user still exists.
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw "The user belonging to this token does no longer exist.";
    }
    // 4) Check if user changed password after the token was issued.
    // For this we will be creating an instace method in usermodel
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw "User recently changed password! Please log in again.";
    }
    // Grant Access to the protected route
    req.user = currentUser;
    // next();
  } catch (err) {
    res.render("error", {
      ErrorCode: 401,
      ErrorStatus: "Fail",
      ErrorMessage: err,
    });
  }
  next();
};

// Implementing logout functionality.
exports.logOut = function (req, res, next) {
  // Creating a fake token
  const token = "loggedout";
  // Sending this fake token to the browser in the form of the token
  res.cookie("jwt", token, {
    // Expiring it in 5 seconds
    expires: new Date(Date.now() + 10 * 1000),
    secure: true,
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
// creating a middleware function which checks if the user is logged in or not.
// This middleware will never lead to an error as it is only chceking if each request that is being made is made by a logged in user or logged out user
exports.isLoggedIn = async function (req, res, next) {
  if (req.cookies.jwt) {
    try {
      // 1) verifies the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      // console.log(currentUser);

      // 2) Check if the user still exists.
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued.
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // There is a logged in user
      res.locals.user = currentUser;
      // This ensures that next() is only called here.
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

// Implementing authorization
// Here we have used closures.
exports.restrictTo = (...roles) => {
  // console.log(roles);
  // Here roles is an array
  return (req, res, next) => {
    try {
      console.log(req.user.role);
      if (!roles.includes(req.user.role)) {
        throw `You don't have permission to perform this action`;
      }
      next();
    } catch (err) {
      res.status(403).json({
        status: "fail",
        message: err.message,
      });
    }
  };
};

// This is not actually the part of authController, we can also place it in userController as this function has nothing to do with authentication and authorisation directly.
// Updating user data
const filterObj = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = async function (req, res, next) {
  try {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      throw "This route is not for password updates.";
    }
    // 2) Fileterd out body with unwanted fields
    const filteredBody = filterObj(req.body, "name", "email");

    // 3) Update user documnet.
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// This is not actually the part of authController, we can also place it in userController as this function has nothing to do with authentication and authorisation directly.
exports.deleteMe = async function (req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: "success",
      message: "Account has been deleted.",
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      message: err,
    });
  }
};

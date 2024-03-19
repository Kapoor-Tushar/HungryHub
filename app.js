// This file will contain all the data required by our express application.
// Importing required modules.
const express = require("express");
const mongoose = require("mongoose");
const shopRouter = require("./api/routes/shopRoutes");
const viewRouter = require("./api/routes/viewRoutes");
const restaurantRouter = require("./api/routes/restaurantRoutes");
const itemRouter = require("./api/routes/itemRoutes");
const menuRouter = require("./api/routes/menuRoutes");
const userRouter = require("./api/routes/userRoutes");
const checkoutRouter = require("./api/routes/checkoutRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

app.use(express.json());
// Setting view engine
app.set("view engine", "ejs");

// Serving static files
// Static files include css, javaScript, img files. We are telling our express application to access these static files from public folder.
app.use(express.static(__dirname + "/public"));
// app.use("/", express.static(path.join(__dirname, "views1")));

// Applying rate limiter
// Using global middleware.
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use("/api", limiter);

// Using cookie-parser to read cookie.
app.use(cookieParser());

//Data Sanitization against NoSQL query injection.
app.use(mongoSanitize());

// Data Sanitization against XSS.
app.use(xss());

// Test middleware
// app.use(function (req, res, next) {
//   console.log(res.locals.user);
//   next();
// });

// Mounting routes
app.use("/", viewRouter);
app.use("/restaurant", restaurantRouter);
app.use("/login", viewRouter);
app.use("/signup", viewRouter);
app.use("/profile", viewRouter);
app.use("/collections", viewRouter);
app.use("/help", viewRouter);
app.use("/checkout", checkoutRouter);
app.use("/api/v1/shops", shopRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/users", userRouter);

// Rendering the main page
// Connecting the api with the database

module.exports = app;

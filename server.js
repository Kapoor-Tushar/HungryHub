// This file will contain all the data related to server

// Requring required modules
const http = require("http");
const app = require("./app"); //Requring this file as it contains all the express logic

const dotnev = require("dotenv");
dotnev.config({
  path: `./config.env`,
});
const mongoose = require("mongoose");
// Connecting our databse
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (connect) {
    // console.log(connect.connections);
    console.log("DB connection successful");
  });
// Creating a port
// We will run this server on port 9000
const port = process.env.PORT || 9000; //Also including process.env.Port for the later case when we deploy the project.

// Creating a server
const server = http.createServer(app);
// Listening to the server
server.listen(port);

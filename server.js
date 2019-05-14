// YARN PACKAGE AND APPLICATION DEPENDENCIES
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
require("./server/db-conn.js");


// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// mount routes
app.use("/api/breeds/", require("./server/routes/breeds-route"))

// initial GET route definition
app.get("/", (req, res) => {
    res.sendFile("client/adogslove/public/index.html", { root: __dirname });
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/adogslove");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

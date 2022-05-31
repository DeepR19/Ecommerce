const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Route imports

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const router = require("./routes/prodRoute");

// Use all routes
app.use("/api/vi", router);

module.exports = app;
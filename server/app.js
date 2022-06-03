const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const errorMiddleWare = require("./middleware/error");
// Route imports

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const product = require("./routes/prodRoute");
const user = require("./routes/userRoute");

// Use all routes
app.use("/api/vi", product);
app.use("/api/vi", user);

// MiddleWare for Errors
app.use(errorMiddleWare)

module.exports = app;
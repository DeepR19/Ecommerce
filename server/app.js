const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUploader = require("express-fileupload");
const errorMiddleWare = require("./middleware/error");
// Route imports

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUploader());

const product = require("./routes/prodRoute");
const order = require("./routes/orderRoute");
const user = require("./routes/userRoute");

// Use all routes
app.use("/api/vi", product);
app.use("/api/vi", user);
app.use("/api/vi", order)   ;

// MiddleWare for Errors
app.use(errorMiddleWare)

module.exports = app;
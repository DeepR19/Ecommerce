const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUploader = require("express-fileupload");
const errorMiddleWare = require("./middleware/error");
const dotenv = require("dotenv");

dotenv.config({
    path: "server/config/congig.env"
})


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUploader());

// Route imports
const product = require("./routes/prodRoute");
const order = require("./routes/orderRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");

// Use all routes
app.use("/api/vi", product);
app.use("/api/vi", user);
app.use("/api/vi", order);
app.use("/api/vi", payment);

// MiddleWare for Errors
app.use(errorMiddleWare)

module.exports = app;
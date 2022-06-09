const express = require("express");
const router = express.Router();
const {isAuthUser} = require("../middleware/auth");

const {processPayment , sendStripApiKey} = require("../controller/paymentController");


// here we make payment route
router.route("/payment/process").post(
    isAuthUser,
    processPayment   
)


// here we send strip api key to the frontend
router.route("/stripApiKey").get(
    isAuthUser,
    sendStripApiKey
)

module.exports = router;
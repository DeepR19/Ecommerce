const express = require("express");
const router = express.Router();
const {isAuthUser, authorizedUser} = require("../middleware/auth")

const { 
    newOrder,
    getSingleOrder,
    myOrder,
    getAllOrders,
    updateOrder,
    deleteOrder} = require("../controller/orderController");


router.route("/order/new").post(isAuthUser, newOrder)
router.route("/order/:id").get(isAuthUser , getSingleOrder)
router.route("/orders/me").get(isAuthUser, myOrder)
router.route("/admin/orders").get(isAuthUser, authorizedUser("admin"), getAllOrders)

router.route("/admin/order/:id")
.put(isAuthUser, authorizedUser("admin"), updateOrder)
.delete(isAuthUser, authorizedUser("admin"), deleteOrder)

module.exports = router
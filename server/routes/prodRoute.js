const express = require("express");

const {
    isAuthUser,
    authorizedUser } = require("../middleware/auth")

const {
    getAllProducts,
    createProd,
    updateProd,
    deleteProd,
    getProductDetails} = require("../controller/productController");
const router = express.Router();

router.route("/products").get( getAllProducts);

router.route("/product/new").post(isAuthUser ,authorizedUser("admin") , createProd)

router.route("/product/:id")
.get(getProductDetails)
.put(isAuthUser ,authorizedUser("admin") , updateProd)
.delete(isAuthUser ,authorizedUser("admin") , deleteProd)

module.exports = router;
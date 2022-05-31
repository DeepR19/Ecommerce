const express = require("express");
const {getAllProducts , createProd} = require("../controller/productController");
const router = express.Router();

router.route("/products")
.get(getAllProducts);

router.route("/product/new")
.post(createProd)

// router.route("product/:id")
// .put()

module.exports = router;
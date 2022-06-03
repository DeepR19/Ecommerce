const express = require("express");
const router = express.Router();

const {
    isAuthUser,
    authorizedUser } = require("../middleware/auth")

const {
    getAllProducts,
    createProd,
    updateProd,
    deleteProd,
    getProductDetails,
    createProductReview,
    getProductReview,
    deleteProductReview} = require("../controller/productController");
    

router.route("/products").get( getAllProducts);

router.route("/admin/product/new").post(isAuthUser ,authorizedUser("admin") , createProd)

router.route("/admin/product/:id")
.put(isAuthUser ,authorizedUser("admin") , updateProd)
.delete(isAuthUser ,authorizedUser("admin") , deleteProd)


router.route("/product/:id").get(getProductDetails)

// create review
router.route('/prod/review').put(isAuthUser, createProductReview)

// get and delete reviews of product
router.route('/prod/reviews')
.get(getProductReview)
.delete(isAuthUser, deleteProductReview)



module.exports = router;
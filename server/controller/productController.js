const Product = require("../models/prodModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErr = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/API_Features");


// create a product -- Admin
exports.createProd = AsyncErr(async (req, res , next)=>{
    req.body.user = req.user.id;    // req.user data came from middleware

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


// read all product
exports.getAllProducts = AsyncErr(async (req, res)=>{

    const resuluPerPage = 2 ; // no of page is show on find query
    const noOfProduct = await Product.countDocuments() // return no of element in DB

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resuluPerPage);

    const prod = await apiFeature.query;  // it will do find query <--> with some updates

    res.status(200).json({
        message: "ROUTE is working fine...",
        prod,
        noOfProduct
    })
});



// Update Item -- Admin
exports.updateProd = AsyncErr(async (req, res, next)=>{
    // first find item
    const item = await Product.findById(req.params.id);

    if(!item){
        return  next(new ErrorHandler("Product Not Found", 404))
    }

    // then update the item
    const item1 = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );

    res.status(200).json({
        success: true,
        product: item1
    });
});

// delete prod -- Admin
exports.deleteProd = AsyncErr(async (req, res, next)=>{
    const product =await Product.findById(req.params.id);

    if(!product){
        return  next(new ErrorHandler("Product Not Found", 404))
    };

    // remove that product
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Item remove successfully"
    });
})


exports.getProductDetails = AsyncErr(async (req, res, next)=>{
    const product =await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    };

    res.status(200).json({
        success: true,
        product
    });
})
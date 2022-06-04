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
    const productCount = await Product.countDocuments() // return no of element in DB

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resuluPerPage);

    const prod = await apiFeature.query;  // it will do find query <--> with some updates

    res.status(200).json({
        message: "ROUTE is working fine...",
        prod,
        productCount
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
});

// get single product details
exports.getProductDetails = AsyncErr(async (req, res, next)=>{
    const product =await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    };

    res.status(200).json({
        success: true,
        product
    });
});


// create new review and update the review
exports.createProductReview = AsyncErr(async (req, res, next)=>{

    // fing product to be reviewed
    const prodId = req.body.productId

    // set review data
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment
    }


    const prod = await Product.findById(prodId);


    // req.user came from middleware
    // rev.user is the reciews field value  
    const isReviewed = prod.reviews.find(
        rev => rev.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        // already exist user's review
        prod.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = req.body.rating,
                rev.comment = req.body.comment
            }
        })
    }else{
        // adding new review
        prod.reviews.push(review);
        prod.numOfReview = prod.reviews.length
    };


    let avg = 0;
    
    // here we add all the review and then divide by the lenght by the reviews
    prod.reviews.forEach(rev=>{ avg += rev.rating })
    
    prod.ratings = avg / (prod.reviews.length)


    await prod.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true
    })

});




// get all review of single product
exports.getProductReview = AsyncErr(async(req, res, next)=>{
    const product =await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    };

    res.status(200).json({
        success: true,
        reviews : product.reviews
    });
});



// get all review of single product
exports.deleteProductReview = AsyncErr(async(req, res, next)=>{
    const product =await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    };

    const reviews = product.reviews.filter(rev=>{
        rev._id.toString() !== req.query.id.toString()
    });

    let avg = 0;
    reviews.forEach(rev=>{
        avg += rev.rating
    });
    let ratings, numOfReview

    if(reviews.length> 0){
         ratings = avg / reviews.length;
         numOfReview = reviews.length;
    }else{
        ratings = 0;
        numOfReview = 0
    }

    const _data = {
        reviews,
        ratings,
        numOfReview
    }

    await Product.findByIdAndUpdate(req.query.productId, _data ,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reviews : product.reviews
    });
});
const Product = require("../models/prodModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErr = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/API_Features");
const cloudinary = require("cloudinary");


// create a product -- Admin
exports.createProd = AsyncErr(async (req, res , next)=>{
    let images = [];

    if(typeof(req.body.images) === "string"){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }


    const imagesLink = [];

    let i = 0;
    let result

   while(i< images.length) {
        result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url
        });
        i++;
      }

      req.body.images = imagesLink;
    req.body.user = req.user.id;    // req.user data came from middleware

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


// read all product
exports.getAllProducts = AsyncErr(async (req, res)=>{

    const resuluPerPage =8 ; // no of page is show on find query
    const productCount = await Product.countDocuments() // return no of element in DB

    const apiFeaturess = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resuluPerPage)

    let prod1 = await apiFeaturess.query;
    let prod = await apiFeature.query;

    let filteredProductsCount = prod1.length;
      // it will do find query <--> with some updates

    res.status(200).json({
        message: "ROUTE is working fine...",
        prod,
        productCount,
        resuluPerPage,
        filteredProductsCount
    })
});


// get admin product
exports.getAdminProducts = AsyncErr(async(req, res, next)=>{
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})


// Update Item -- Admin
exports.updateProd = AsyncErr(async (req, res, next)=>{
    // first find item
    const product = await Product.findById(req.params.id);

    if(!product){
        return  next(new ErrorHandler("Product Not Found", 404))
    }

    // images start here
    let images = [];

    if(typeof(req.body.images) === "string"){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }

    if(images !== undefined){
        
        // delete previousimage from cloud
        for(let i =0; i<product.images.length; i++){
            await cloudinary.v2.uploader.destroy(
                product.images[i].public_id
            )
        };

        // add new images
        const imagesLink = [];

        for(let i=0; i<images.length;i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });
    
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        };

        req.body.images = imagesLink
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

    // delete image from cloud
    for(let i =0; i<product.images.length; i++){
        await cloudinary.v2.uploader.destroy(
            product.images[i].public_id
        )
    }

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
    const isReviewed =prod.reviews.length>0? prod.reviews.find(
        rev => rev.user.toString() === req.user._id.toString()
        ): false;

        
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

    if(isReviewed.length === 0){
        prod.rating = 0
    }else{
        prod.ratings = avg / (prod.reviews.length)

    }
    

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
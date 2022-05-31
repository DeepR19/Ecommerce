const Product = require("../models/prodModel");

// create a product -- Admin
exports.createProd = async (req, res , next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}


// read all product
exports.getAllProducts = async (req, res)=>{
    const prod = await Product.find();
    res.status(200).json({
        message: "ROUTE is working fine...",
        prod
    })
};



// Update Item --Admin
exports.updateProd = async (req, res, next)=>{
    const item = Product.findById(req.params.id)
}
const Order= require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/prodModel");
const AsyncErr = require("../middleware/catchAsyncError");

// create new Order
exports.newOrder = AsyncErr(async (req, res, next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })
});


// get single order
exports.getSingleOrder = AsyncErr(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",    // key
        "name email"   // value
    );

    if(!order){
        return next(new ErrorHandler("Order not found", 404))
    }

    res.status(200).json({
        success:true,
        order
    })
});



// get loggedIn user order
exports.myOrder = AsyncErr(async(req, res, next)=>{

    // cart item
    const orders = await Order.find({
        user: req.user._id
    })

    res.status(200).json({
        success:true,
        orders
    })
});


// get all orders -- Admin
exports.getAllOrders = AsyncErr(async (req, res, next)=>{
    const orders = await Order.find();

    let totalAmount = 0;
    
    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});



// update order status -- Admin
exports.updateOrder = AsyncErr(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found", 404));
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this product", 400))
    }

    
    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async order=>{
            await updateStoke(
                order.product,
                order.quantity
            )
        });
    }

    order.orderStatus = req.body.status;
    
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({
        validateBeforeSave: false
    })

    res.status(200).json({
        success: true
    })
});



async function updateStoke(id, quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;
    
    await product.save({
        validateBeforeSave: false
    })
};


// delete Order -- Admin
exports.deleteOrder = AsyncErr(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found", 404));
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})
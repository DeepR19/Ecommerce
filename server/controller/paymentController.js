const AsyncErr = require("../middleware/catchAsyncError");


// add stripe account
const strip = require("stripe");
const stripe = strip("sk_test_51L8U8jSC6x4rThmzBxUc5UCwhpYN8sPYHuyyRFq0UgQBdv5LeXH6rsTUP4mOt4ehMOeTAcL1NMndWdoJbFKODeRk00079iHYS9")



// user payment is done by stripe
exports.processPayment = AsyncErr(async (req, res, next)=>{
    
    const myPayment =await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "DeepR19 | Ecommerce"
        }
    });
    // console.log(myPayment)
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })
});

exports.sendStripApiKey = AsyncErr(async(req, res, next)=>{
    res.status(200).json({
        stripApiKey: process.env.Strip_Key
    })
})
const mongoose = require("mongoose")
const { listen } = require("../app")

const ProdSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter Product name"]
    },
    description:{
        type: String,
        required: [true, "Please enter Product Details"]
    },
    price: {
        type: Number,
        required: [true, "Please enter products Price"],
        maxlength: [8, "price can't exceed 8 character"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
     }],
    category: {
        type: String,
        required: [true, "Please enter the category of products"]
    },
    Stock:{
        type: Number,
        required: [true, "Please enter the stock of that"],
        maxlength: [4, "Stock can't exceed by 4 character"],
        default: 1
    },
    numOfReview:{
        type: Number,
        default: 0
    },   
    reviews:[
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model("Products", ProdSchema)
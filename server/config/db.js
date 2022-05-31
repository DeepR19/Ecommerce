const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config/config.env"});

const ConnDB =()=>{
    // console.log(_url)
    mongoose.connect( "mongodb+srv://Deepak:DeepR%402019@mern-ecommerce.kawq8.mongodb.net/?retryWrites=true&w=majority"
        ,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
            
    }).then(()=>{
        console.log("MONGO Done")
    }).catch((err)=>{
        console.log(err);
    });
}
module.exports  = ConnDB
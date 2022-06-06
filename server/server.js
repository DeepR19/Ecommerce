const app =  require("./app");
const dotenv = require("dotenv");
const ConnDB = require("./config/db");
const cloudinary = require("cloudinary");

// handle uncaught exception
process.on("uncaughtException", err=>{
    console.log("Error",err.message);
    console.log("Error due to uncaught exception");

    // stop the application immediately
    process.exit(1);
});

// add config file
dotenv.config({
    path: "./config/config.env"
});

// Connect DB
ConnDB();

// connect cloudinary {for image upload}
cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret,
});


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT , ()=>{
    console.log("Server is started on port: ",PORT)
});


// Unhandled Promise Rejection
process.on("unhandledRejection", err=>{
    console.log("Error",err.message);
    console.log("Error shutting down due to Unhandled Promise Rejection")

    // close the server
    server.close(()=>{
        // end application immediately
        process.exit(1);
    })
})
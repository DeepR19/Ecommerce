const ErrorHandler = require("../utils/errorHandler");


module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error...";

// wrong mongoDB error
    if(err.name === "CastError"){
        const message = "Resource not found. Invalid "+ err.path;

        err = new ErrorHandler(message, 400)
    }

// MongoDB duplicate error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValues)} entered`
        err = new ErrorHandler(message, 400)
    }

// Wrong JWT
    if(err.name ==="JsonWebTokenError"){
        const message = "JSON Web TOken is invalid, try again"
        err = new ErrorHandler(message, 400)
    }

// JWT expire Error
    if(err.name ==="TokenExpiredError"){
        const message = "JSON Web TOken is Expired, try again"
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    });
};
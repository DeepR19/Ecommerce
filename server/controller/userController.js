const ErrorHandler = require("../utils/errorHandler");
const AsyncErr = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register user
exports.registerUser = AsyncErr( async(req, res, next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample",
            url: "profile_PIC"
        }
    });

    // res and save data in cookie
    sendToken(user, 200, res);


});



exports.loginUser = AsyncErr( async (req, res, next)=>{
    const {email, password} = req.body;

    // check email and password
    if(!email || !password){
        return next(new ErrorHandler("Something went wrong...", 400));
    }

    // find user by email
    const user = await User.findOne({email}).select("+password");   // select is used to show password in result

    if(!user){
        return next(new ErrorHandler("Something went wrong...", 401));
    }

    // check password
    const isPasswordMatch = user.comparePassword(password);   // compare Bcrupt password with normal password
    
    if(!isPasswordMatch){
        return next(new ErrorHandler("Something went wrong...", 401));
    };

    // res and save data in cookie
    sendToken(user, 201, res);
});


exports.logout = AsyncErr(async (req, res, next)=>{

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
});


exports.forgotPassword = AsyncErr(async(req, res, next)=>{
    const user = await User.findOne({
        email: req.body.email
    });

    if(!user){
        return next(new ErrorHandler("user not found", 404))
    }

    // get resetPasswordTOken
    const resetToken = user.getResetPasswordToken();

    await user.save({
        validateBeforeSave: false
    });

    // mail link to reset password
    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/vi/password/reset/${resetToken}`;

    // message to be send in the mail
    const message = `
        Your password reset token is :- \n\n ${resetPasswordURL} 
        \n\n If you have not requested this email then, please Ignore it.
    `;


    // here we make path to send Email
    // and, if any err come resetPassToke and resetPassExpire => undefined
    try{
        await sendEmail({
            email:  user.email,
            subject: `Deepak/34 Ecommerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({
            validateBeforeSave : false
        });

        return next(new ErrorHandler(err.message, 500));
    }

});


// reset password
exports.resetPassword = AsyncErr(async (req, res, next)=>{
    const resetPasswordToken =  crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()         // checking the date of ecpires greater then the DB date     
        }
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 401));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.password;

    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save();

    sendToken(user ,200, res);
})
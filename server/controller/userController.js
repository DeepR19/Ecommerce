const ErrorHandler = require("../utils/errorHandler");
const AsyncErr = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

const cloudinary = require("cloudinary");

// Register user
exports.registerUser = AsyncErr( async(req, res, next)=>{

    // for image upload in cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(
        req.body.avatar ,
        {
            folders: "avatars",
            width: 150,
            crop: "scale"
        }
    )

    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
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
    const isPasswordMatch = await user.comparePassword(password);   // compare Bcrupt password with normal password
    console.log(isPasswordMatch)
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
});


// get individual details
exports.getUserDetails = AsyncErr(async (req, res, next)=>{
    const user= await User.findById(req.user.id);  //  req.user came from middleware

    res.status(200).json({
        success: true, 
        user
    })
});


// update user password
exports.updatePassword = AsyncErr(async (req, res, next)=>{
    const user= await User.findById(req.user.id).select("+password");  //  req.user came from middleware

    // check password
    const isPasswordMatch = user.comparePassword(req.body.oldPassword);   // compare Bcrupt password with normal password
    
    // check oldPassword and new with confirm password
    if(!isPasswordMatch){
        return next(new ErrorHandler("old password is incorrect...", 401));
    };
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400))
    };

    user.password = req.body.newPassword;

    await user.save();

   sendToken(user, 200, res);
})





// update user profile
exports.updateProfile = AsyncErr(async (req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user  = await User.findByIdAndUpdate(
        req.user.id,
        newUserData,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );

    res.status(200).json({
        success: true,
        user
    });

});



// Get All Users
exports.getAllUser = AsyncErr(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});



// get user details { admin }
exports.getSingleUser = AsyncErr(async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
});



// User role update -- Admin
exports.updateUserRole = AsyncErr(async(req, res, next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user  = await User.findByIdAndUpdate(
        req.params.id,
        newUserData,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );

    res.status(200).json({
        success: true,
        user
    });
});



// Delete User -- Admin
exports.DeleteUser = AsyncErr(async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User does not exist with this id", 401))
    }

    await user.remove();  // this is used to remove user from the DB by Admin

    res.status(200).json({
        success: true,
    })
})
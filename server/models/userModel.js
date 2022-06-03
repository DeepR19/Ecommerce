const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        minlength: [4, "name can't be less than 4 character"],
        maxlength: [30, "name can't be more than 30 character"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid mail id"]
    },
    password:{
        type: String,
        required: [true, "Please enter your passeord"],
        minlength: [8, "Password should br greater than 8 character"],
        select: false
    },
    avatar: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    resetPasswordToken:{
        type: String
    },
    resetPasswordExpire:{
        type: Date
    }
});


UserSchema.pre("save", async function(next){

    if(!this.isModified("password")){   
        next();     // next is called when password is not modified
    };

    this.password = await bcrypt.hash(this.password, 12);
});

// JWT token
UserSchema.methods.getJWT_Token = function(){

    return jwt.sign(   // sign is used to generate token
        {
            id: this._id        // id
        },
        process.env.Secret,     // secret
        {
            expiresIn: process.env.TokenExpire  // expire period
        }
    );
};
  
// compare password
UserSchema.methods.comparePassword = async function(enteredPassword){
    const re = await bcrypt.compare(enteredPassword , this.password)
    return re;
}

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
    .createHash("sha256")       // applu algo to hash reset token
    .update(resetToken)        // update resetPasswordToken by resetToken 
    .digest("hex")              // convert resetTOken to hex string

    this.resetPasswordExpire = Date.now() + 15*60*1000

    return resetToken;
}


module.exports = mongoose.model("User", UserSchema)
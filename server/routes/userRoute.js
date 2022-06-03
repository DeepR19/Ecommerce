const express = require("express")
const router = express.Router();
const User = require("../models/userModel")

const {
    registerUser, 
    loginUser,
    logout,
    forgotPassword,
    resetPassword
}  = require("../controller/userController");

router.route("/get").get(async(req, res, next)=>{
    const user = await User.find()

    res.status(200).json({
        user
    })
})
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/pass/forgot").post(forgotPassword)
router.route("/pass/reset/:token").put(resetPassword)

module.exports = router 
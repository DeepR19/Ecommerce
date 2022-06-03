const express = require("express")
const router = express.Router();
const User = require("../models/userModel")

const {isAuthUser, authorizedUser} = require("../middleware/auth"); 

const {
    registerUser, 
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    DeleteUser,
    updateUserRole
}  = require("../controller/userController");

router.route("/me").get(isAuthUser, getUserDetails);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/pass/forgot").post(forgotPassword)
router.route("/pass/reset/:token").put(resetPassword)
router.route('/pass/update').put(isAuthUser, updatePassword);
router.route('/me/update').put(isAuthUser, updateProfile);

router.route("/admin/users").get(isAuthUser, authorizedUser("admin"), getAllUser)

router.route("/admin/user/:id")
.get(isAuthUser, authorizedUser("admin"), getSingleUser)
.put(isAuthUser, authorizedUser("admin"), updateUserRole)
.delete(isAuthUser, authorizedUser("admin"), DeleteUser)

module.exports = router 
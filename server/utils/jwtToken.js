const sendToken = (user, statusCode, res)=>{
    const token = user.getJWT_Token()

    // options for cookie
    const options = {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.CookieExpire * 24 * 60* 60* 1000
        )
    };

    // create , store and saving  jwt 
    res.status(statusCode)
    .cookie("token", token, options)
    .json({
        success: true,
        user,
        token
    })
};

module.exports = sendToken
// this module is used for trycatch

module.exports = theFunc => (req, res, next)=>{

    // here resolve is used as try
    // catch is similar as catch
    Promise.resolve(theFunc(req, res, next)).catch(next)
}
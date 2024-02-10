const jwt = require('jsonwebtoken')
const user = require('../models/user_model');
const catchAsyncErroe = require('../middlewares/catchAsyncErroe')
const ErrorHandler = require("../utils/errorhandler")
exports.isAuthenticated = catchAsyncErroe(async (req, res, next) => {

 let { token } = req.cookies;
 console.log(req.cookies);
 if (!token) {
  return res.status(404).json({
   message: "please login"
  })
 }
 const decodeddata = jwt.verify(token, process.env.SECRETE_KEY);
 req.user = await user.findById(decodeddata.id);
 next();

})
exports.authorizeRoles = (...roles) => {//..roles this put all parametre in an array roles
 return (req, res, next) => {
  if (!roles.includes(req.user.role)) {
   return next(new ErrorHandler(403,
    `Role: ${req.user.role} is not allowed to access this resource`
   ));
  }
  next()
 };
};
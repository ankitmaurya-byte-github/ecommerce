const errorhandler = require('../utils/errorhandler');
const usermodel = require('../models/user_model');

const catchAsyncErroe = require('../middlewares/catchAsyncErroe');
const cloudinary = require('cloudinary');
const crypto = require('crypto');
const sendTokens = require('../utils/sendtoken');
const sendEmail = require("../utils/sendEmail.js")

exports.registerUser = catchAsyncErroe(async (req, res, next) => {

 const mycloud = await cloudinary.uploader.upload(req.body.avatar,
  {
   folder: 'photo',
   width: 150,
   crop: 'scale'
  });
 if (!mycloud) {
  console.log("Dhfhdhd");
  return res.status(500).json({
   message: "fail hogaya bhai"
  })
 }
 const { email, password, name } = req.body
 const searchuser = await usermodel.findOne({ email })
 if (!!searchuser) {
  return next(new errorhandler(404, "email already exists tyr with diffrent email"))

 }
 const user = await usermodel.create({
  email,
  password,
  name,
  avatar: {
   post_id: mycloud.public_id,
   post_url: mycloud.secure_url,
  }
 })
 sendTokens(user, 200, res)
})
exports.loginUser = catchAsyncErroe(async (req, res, next) => {
 const { email, password } = req.body
 if (!email || !password) {
  res.status(404).json({
   success: false,
   message: "Invalid email or password",
  })
 }
 const user = await usermodel.findOne({ email }).select("+password")
 if (!user) {
  return next(new errorhandler(404, "User not found"))
 }
 const ismathched = await user.comparepassword(password)

 if (!ismathched) {
  res.status(404).json({ message: "invalid password" })
 }
 sendTokens(user, 200, res)
})
exports.logoutUser = catchAsyncErroe(async (req, res, next) => {
 res.cookie("token", null, {
  expires: new Date(Date.now()),
  httpOnly: true
 })
 res.status(200).json({ success: true, message: "lodged out successfully" })
})
exports.forgetPassword = catchAsyncErroe(async (req, res, next) => {
 const user = await usermodel.findOne({ email: req.body.email })
 if (!user) {
  return next(new errorhandler(404, "user not found"))
 }
 const token = user.sendResetToken()
 await user.save({ validateBeforeSave: false })
 console.log(user);
 const resetURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${token}`

 const message = `reset your password using this token \n\n${resetURL} \n\n if you have not requested this then please ignore it `

 try {
  await sendEmail({
   email: user.email,
   subject: "password recovery",
   message
  })
  res.status(200).json({
   success: true,
   message: `email sent to ${user.email}successfully`,
  })
 } catch (error) {
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save({ validationBeforeSave: false })
  return next(new errorhandler("failed to send email", 404))
 }
})
exports.resetPassword = catchAsyncErroe(async (req, res, next) => {
 const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
 console.log(hashedToken);

 const user = await usermodel.findOne({
  resetPasswordToken: hashedToken,
  resetPasswordExpires: { $gt: Date.now() }
 })
 if (!user) {
  return next(new errorhandler(404, "invalid token request"))
 }
 console.log(user.name);
 if (req.body.confirmPassword !== req.body.password) {
  return next(new errorhandler(404, "password do not match"))
 }
 user.password = req.body.password
 // user.resetPasswordExpires = undefined
 // user.resetPasswordToken = undefined
 await user.save()
 sendTokens(user, 200, res)

})
exports.tryA = async (req, res) => {
 const user = await usermodel.findOne({ email: req.body.email })
 const token = await user.sendResetToken()
 await user.save({ validateBeforeSave: false })
 console.log(user.resetPasswordToken);
 res.send(token)
}
exports.getUserDetail = catchAsyncErroe(
 async (req, res, next) => {
  const user = await usermodel.findOne({ _id: req.user.id })
  console.log("getuserDetail");
  res.status(200).json({
   success: true,
   isAuthenticated: true,
   user
  })
 }
)
exports.updatePassword = catchAsyncErroe(
 async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
   return next(new errorhandler(404, "password dont match"))
  }
  const user = await usermodel.findOne(req.user._id).select("+password")
  const password = req.body.oldPassword
  const ismatched = await user.comparepassword(password)
  if (!ismatched) {
   return next(new errorhandler(404, "incorrect old password"))
  }
  user.passsword = req.body.password
  await user.save()

  res.status(200).json({
   success: true,
   message: "password updated sucessfully"
  })
 }
)
exports.updateProfile = catchAsyncErroe(
 async (req, res, next) => {
  let option = {}
  if (req.body.avatar) {
   const mycloud = await cloudinary.uploader.upload(req.body.avatar,
    {
     folder: 'photo',
     width: 150,
     crop: 'scale'
    });
   if (!mycloud) {
    console.log("Dhfhdhd");
    return res.status(500).json({
     message: "fail hogaya bhai"
    })
   }
   let options = {
    name: req.body.name,
    email: req.body.email,
    avatar: {
     post_id: mycloud.public_id,
     post_url: mycloud.secure_url,
    }
   }

  }
  const user = await usermodel.findByIdAndUpdate(req.user.id, options, {
   new: true,
   newValidator: true,
   useFindAndModify: false
  })
  res.status(200).json({
   success: true,
   message: "profile updated sucessfully",
   user
  },)
 }
)
exports.getSingleUser = catchAsyncErroe(
 async (req, res, next) => {
  const user = await usermodel.findById(req.params.id)
  if (!user) {
   return next(new errorhandler(404, "user not found"))
  }
  res.status(200).json({
   success: true,
   user
  })
 }
)
exports.deleteUser = catchAsyncErroe(
 async (req, res, next) => {
  const user = await usermodel.findById(req.params.id)
  await user.remove()
  res.status(200).json({
   success: true,
   message: "user deleted",
   user
  })
 }
)
exports.getAllUser = catchAsyncErroe(
 async (req, res, next) => {
  const allUser = await usermodel.find()
  res.status(200).json({
   success: true,
   allUser
  })
 }
)
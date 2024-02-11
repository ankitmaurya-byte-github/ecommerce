const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
 name: {
  type: 'string',
  required: true,
  maxLength: [30, "please enter smaller name"],
  minLength: [4, "please enter a bigger name"],
 },
 password: {
  type: 'string',
  select: false,
  required: true,
  minLength: [8, "please enter minimum 8 character"]
 },
 email: {
  type: 'string',
  required: true,
  validate: [validator.isEmail, "please enter a valid email"],
  unique: true,
 },
 avatar: {
  post_id: {
   type: 'string',
   required: true
  },
  post_url: {
   type: 'string',
   required: true
  }
 },
 role: {
  type: 'string',
  default: 'user'
 },
 createdAt: {
  type: Date,
  default: Date.now,
 },
 resetPasswordToken: String,
 resetPasswordExpires: Date,
})

userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) {
  return next();
 }
 this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.getJWTToken = function () {
 return jwt.sign({ id: this._id }, process.env.SECRETE_KEY, {
  expiresIn: process.env.DATE_EXPIRES,
 })
}
userSchema.methods.comparepassword = async function (password) {
 return bcrypt.compare(password, this.password)
}
userSchema.methods.sendResetToken = async function () {
 const token = crypto.randomBytes(20).toString('hex')
 this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
 this.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
 return token
}
module.exports = mongoose.model('User', userSchema)

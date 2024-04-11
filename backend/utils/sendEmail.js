const nodemailer = require('nodemailer');
const catchAsyncErroe = require('../middlewares/catchAsyncErroe');
module.exports = sendEmail = async (emailData) => {
 console.log("send email function");
 console.log(emailData);
 const testAccount = nodemailer.createTestAccount()
 // const transporter = nodemailer.createTransport({
 //  service: process.env.SMPT_SERVIECE,
 //  auth: {
 //   // user: process.env.SMPT_EMAIL,
 //   // pass: process.env.SMPT_PASSWORD
 //   user: "harley.sawayn@ethereal.email",
 //   pass: "xHYwES1CGfzUAcMa5A"
 //  }
 // })
 const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
   user: 'kylee.schinner@ethereal.email',
   pass: 'JgXs7ZBAey7tt1mYuW'
  }
 });
 const optional = {
  from: "kylee.schinner@ethereal.email",
  to: emailData.email,
  subject: emailData.subject,
  text: emailData.message
 }
 console.log("transporter created");
 try {
  const info = await transporter.sendMail(optional);
  console.log('Email sent successfully');
  return info
 } catch (error) {
  console.error('Error sending email:', error);
 }
}
exports.name = catchAsyncErroe(async (req, res) => {
 const data = await product.create(req.body)
 if (!data) {
  return next(new ErrorHandler(404, "product failed to create"))
 }
 res.status(200).json({
  success: true,
  data
 })
})







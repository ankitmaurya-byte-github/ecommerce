const nodemailer = require('nodemailer');
const catchAsyncErroe = require('../middlewares/catchAsyncErroe');
module.exports=sendEmail = async (emailData) => {
    console.log("email func");
   const transporter=nodemailer.createTransport({
        service: process.env.SMPT_SERVIECE,
        auth: {
            user:process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASSWORD
        }
   })
    const optional = {
        from: process.env.SMPT_EMAIL,
        to: emailData.email,
        subject: emailData.subject,
        text: emailData.message
    }
    console.log("this");
    transporter.sendMail(optional)
}
exports.name=catchAsyncErroe(async (req, res) => {
    const data=await product.create(req.body)
    if(!data){
        return next(new ErrorHandler(404,"product failed to create"))
    }
    res.status(200).json({
        success:true,
        data
    })
})
    





    
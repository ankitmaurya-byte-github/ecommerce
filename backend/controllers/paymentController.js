require("dotenv").config({ path: "backend/config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncErroe = require("../middlewares/catchAsyncErroe");

module.exports = {
 processPayment: catchAsyncErroe(async (req, res, next) => {
  console.log(req.body);
  const mypayment = await stripe.paymentIntents.create({
   amount: req.body.amount,
   currency: "inr",
   metadata: {
    company: "Ecomerce",
   },
  });
  console.log("payment process");
  res.status(200).json({
   success: true,
   client_secret: mypayment.client_secret,
  });
 })
 ,
 sendStripeApiKey: catchAsyncErroe(async (req, res, next) => {
  res.status(200).json({
   stripeApiKey: process.env.STRIPE_API_KEY,
  });
 })

}

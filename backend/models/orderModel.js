const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
 shipingInfo: {
  address: {
   type: String,
   require: true
  },
  city: {
   type: String,
   require: true
  },
  state: {
   type: String,
   require: true
  },
  country: {
   type: String,
   require: true
  },
  pincode: {
   type: Number,
   require: true
  },
  phoneNumber: {
   type: Number,
   require: true
  }

 },
 orderItem: [
  {
   name: {
    type: String,
    require: true
   },
   price: {
    type: Number,
    require: true
   },
   quantity: {
    type: Number,
    require: true
   },
   Image: {
    type: String,
    require: true
   },
   productId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: "Product"
   }
  }
 ],
 user: {
  type: mongoose.Schema.ObjectId,
  require: true,
  ref: "User"
 },
 paidAt: {
  type: Date,
  require: true
 },
 paymentInfo: {
  id: {
   type: String,
   require: true
  },
  status: {
   type: String,
   require: true
  }
 },
 itemsPrice: {
  type: Number,
  // required: true,
  default: 0,
 },
 taxPrice: {
  type: Number,
  // required: true,
  default: 0,
 },
 shippingPrice: {
  type: Number,
  // required: true,
  default: 0,
 },
 totalPrice: {
  type: Number,
  required: true,
  default: 0,
 },
 orderStatus: {
  type: String,
  required: true,
  default: "Processing",
 },
 deliveredAt: Date,
 createdAt: {
  type: Date,
  default: Date.now,
 },

})
module.exports = mongoose.model("Order", orderSchema)
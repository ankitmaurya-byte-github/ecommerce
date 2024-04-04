const orderModel = require("../models/orderModel")
const productModel = require("../models/product_model")
const catchAsyncError = require("../middlewares/catchAsyncErroe")
const ErrorHandler = require("../utils/errorhandler")
exports.createOrders = catchAsyncError(
 async (req, res, next) => {
  const {
   shipingInfo,
   orderItem,
   orderStatus,
   totalPrice,
  } = req.body

  const order = await orderModel.create({
   shipingInfo,
   orderItem,
   orderStatus,
   totalPrice,
   paidAt: Date.now(),
   user: req.user.id
  })

  res.status(200).json({
   success: true,
   message: "order created successfuly",
   order
  })
 }
)

exports.getSingleOrder = catchAsyncError(
 async (req, res, next) => {
  const order = await orderModel.find({ _id: req.params.id }).populate("user", "email name");

  if (!order) {
   return next(new ErrorHandler(404, "no orders founded"))
  }
  res.status(200).json({
   success: true,
   order
  })
 }
)
exports.myOrder = catchAsyncError(
 async (req, res, next) => {
  console.log(req.user.id);
  const orders = await orderModel.find({ user: req.user.id })
  if (!orders) {
   return next(new ErrorHandler(404, "no orders founded"))
  }
  res.status(200).json({
   success: true,
   orders
  })
 }
)
exports.getAllOrders = catchAsyncError(
 async (req, res, next) => {
  const orders = await orderModel.find()
  let totalPrice = 0
  orders.forEach(order => {
   totalPrice += order.totalPrice
  })
  res.status(200).json({
   success: true,
   orders,
   totalPrice
  })
 }
)
exports.updateOrders = catchAsyncError(
 async (req, res, next) => {
  const orders = await orderModel.findOne({ _id: req.params.id })
  if (req.body.status == "shipped") {
   orders.orderItem.forEach(async order => {
    await updateStock(order.productId, order.quantity)
   })
  }
  orders.orderStatus = req.body.status
  if (orders.orderStatus == "delivered") {
   orders.deliveredAt = Date.now()
  }
  await orders.save({ validateBeforeSave: false })
  res.status(200).json({
   success: true,
   message: "order updated successfully",
   orders
  })
 }
)
const updateStock = async (productId, quantity) => {
 const product = await productModel.findById(productId)
 product.stock -= quantity
 await product.save({ validateBeforeSave: false })
}
exports.deleteOrders = catchAsyncError(
 async (req, res, next) => {
  const order = await orderModel.findOne({ _id: req.params.id })
  await order.remove()
  res.status(200).json({
   message: "order deleted",
   success: true
  })
 }
)
1

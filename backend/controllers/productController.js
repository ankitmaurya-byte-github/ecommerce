const catchAsyncErroe = require("../middlewares/catchAsyncErroe")
const productModel = require("../models/product_model")
const ErrorHandler = require("../utils/errorhandler")
const usermodel = require("../models/product_model")
const apiFeature = require("../utils/apiFeature")
module.exports = {
 creatProduct: catchAsyncErroe(async (req, res) => {
  req.body.user = req.user.id
  const data = await productModel.create(req.body)
  if (!data) {
   return next(new ErrorHandler(404, "product failed to create"))
  }
  res.status(200).json({
   success: true,
   data
  })
 }),
 getAllProduct: catchAsyncErroe(async (req, res, next) => {
  // return next(new ErrorHandler(404,"alert ho jao"))
  const dataPerPage = 6
  let data = new apiFeature(productModel.find(), req.query).search().filter()

  let totaldoc = await productModel.countDocuments()

  if (!data) {
   return next(new ErrorHandler(404, "product not found"))
  }
  let product = await data.product
  let filterProductCount = product.length;
  data = data.pagination(dataPerPage)
  product = await data.product
  res.status(200).json({
   success: true,
   product,
   totaldoc,
   dataPerPage,
   filterProductCount
  });
 }),
 updateProduct: catchAsyncErroe(async (req, res) => {
  let data = await productModel.findById(req.params.id)
  if (!data) {
   return next(new ErrorHandler(404, "product not found"))
  }
  data = await data.findByIdAndUpdate(req.params.id, req.body, {
   new: true,
   useValidator: true,
   useFindAndModify: false
  });

  res.status(200).json({
   success: true,
   data
  })

 }),
 deleteProduct: catchAsyncErroe(async (req, res) => {
  let data = await productModel.findById(req.params.id)
  if (!data) {
   return next(new ErrorHandler(404, "product not found"))
  }
  await data.remove()
  res.status(200).json({
   success: true,
   message: "product removed successfully"
  })
 }),
 productDetails: catchAsyncErroe(async (req, res, next) => {
  const data = await productModel.findById(req.params.id)
  console.log(req.params.id);
  if (!data) {
   return next(new ErrorHandler(404, "product not found"))
  }
  res.status(200).json({
   success: true,
   data
  })
 }),
 deleteReview: catchAsyncErroe(
  async (req, res, next) => {
   const product = await usermodel.findById(req.body.productId)
   const reviews = product.reviews.filter(rev => {
    return req.user.id.toString() != rev.user.toString()
   })

   let avg = 0
   reviews.forEach(rev => {
    avg += rev.rating
   })
   let ratings = reviews.length == 0 ? 0 : avg / reviews.length
   let numOfReviews = reviews.length
   await usermodel.findByIdAndUpdate(req.body.productId, {
    reviews,
    ratings,
    numOfReviews
   }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
   })
   res.status(200).json({
    message: "rating deleted successfully",
    success: true
   })
  }
 ),
 addReview: catchAsyncErroe(
  async (req, res, next) => {
   const { comment, rating, productId } = req.body
   const product = await usermodel.findById(productId)
   const isreviewed = product.reviews.find(rev => {
    return req.user.id.toString() == rev.user.toString()
   })

   const review = {
    comment,
    rating: Number(rating),
    user: req.user._id,
    name: req.user.name
   }
   if (isreviewed) {
    product.reviews.forEach(rev => {
     if (rev.user.toString() === req.user.id.toString()) {
      rev.comment = comment
      rev.rating = rating
     }
    });
   } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length

   }
   let avg = 0
   product.reviews.forEach(rev => {
    avg += rev.rating
   })
   product.ratings = avg / product.reviews.length
   await product.save({ validateBeforeSave: false })// why its need 
   res.status(200).json({
    message: "rating updated sucessfully",
    success: true
   })
  }

 ),
 getProductReview: catchAsyncErroe(
  async (req, res, next) => {

   const product = await
    usermodel.findById(req.params.productId)
   if (!product) {
    return next(new ErrorHandler(404, "product not found"))
   }
   res.status(200).json({
    success: true,
    review: product.reviews
   })
  }
 )

}
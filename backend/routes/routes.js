const { deleteReview, getAllProduct, productDetails, updateProduct, deleteProduct, creatProduct, addReview, getProductReview, getAllAdminProduct } = require('../controllers/productController')
const { isAuthenticated, authorizeRoles } = require('../middlewares/isAuthenticated')

express = require("express")
router = express.Router()

// router.route("/products").get(isAuthenticated, authorizeRoles("admin"), getAllProduct)
router.route("/products").get(getAllProduct)
router.route("/admin/products").get(getAllAdminProduct)

// router.route("/products/new").post(isAuthenticated, authorizeRoles("admin"), creatProduct)
router.route("/products/new").post(isAuthenticated, creatProduct)

// router.route("/products/:id")
//     .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
//     .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
//     .get(isAuthenticated, authorizeRoles("admin"), productDetails)
router.route("/product/:id")
 .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
 .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
 .get(productDetails)
router.route("/product/review").put(isAuthenticated, addReview).delete(isAuthenticated, deleteReview).get(getProductReview)

module.exports = router

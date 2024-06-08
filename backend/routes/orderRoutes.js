const { createOrders, getSingleOrder, getAllOrders, myOrder, deleteOrders, updateOrders } = require("../controllers/orderController")
const express = require("express")
const router = express.Router()

const { isAuthenticated, authorizeRoles } = require("../middlewares/isAuthenticated")

router.route("/order/create").post(isAuthenticated, createOrders)
router.route("/order/me").get(isAuthenticated, myOrder)
router.route("/order/:id").get(getSingleOrder)
// router.route("/order/:id").get(isAuthenticated, getSingleOrder)
router.route("/admin/orders").get(isAuthenticated, getAllOrders)
router.route("/order/:id").put(isAuthenticated, updateOrders).delete(isAuthenticated, deleteOrders)
module.exports = router
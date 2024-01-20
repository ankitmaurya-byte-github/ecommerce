const express = require('express')
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgetPassword, getSingleUser, resetPassword, tryA, updateProfile, updatePassword, getUserDetail, getAllUser, deleteUser } = require('../controllers/userController')
const { isAuthenticated, authorizeRoles } = require('../middlewares/isAuthenticated')

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/try").post(tryA)
router.route("/password/forgot").post(forgetPassword)
router.route("/password/reset/:token").post(resetPassword)
router.route("/me").get(isAuthenticated, getUserDetail)
router.route("/password/update").post(isAuthenticated, updatePassword)
router.route("/profile/update").post(isAuthenticated, updateProfile)
// router.route("/users").get(isAuthenticated, getAllUser)
router.route("/users").get(getAllUser)
router.route("/user/:id").get(isAuthenticated, getSingleUser)
router.route("/user/:id").delete(isAuthenticated, deleteUser)
module.exports = router
const {
 processPayment,
 sendStripeApiKey,
} = require("../controllers/paymentController");

const router = require("express").Router();

router.route("/payment/process").post(processPayment);
router.route("/getApiKey").get(sendStripeApiKey);
module.exports = router;

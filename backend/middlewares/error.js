const errorhandler = require('../utils/errorhandler');
module.exports = (err, req, res, next) => {
 err.statuscode = err.statuscode || 404
 console.log(err);
 err.message = err.message || "Invalid server err"
 if (err.name === "CastError") {
  const message = `resource not found .Invalid: ${err.message}`
  err = new errorhandler(404, message)
 }
 if (err.code === 11000) {
  const message = `duplicate ${Object.keys(err.keyValue)}`
  err = new errorhandler(404, message)
 }
 if (err.name == "TokenExpiredError") {
  err = new errorhandler(404, "you jwt token has expired please try again ")
 }
 res.status(err.statuscode).json({
  success: false,
  statuscode: err.status,
  message: err.message,
  // stack: err.stack
 })
}
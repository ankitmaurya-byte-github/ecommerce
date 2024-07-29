const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const router = require("./routes/routes.js")
const userRoute = require("./routes/userRoute.js")
const orderRoute = require("./routes/orderRoutes.js")
const paymentRoute = require("./routes/paymentRoutes.js")
const errorHandler = require("./middlewares/error.js")

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());
app.use(fileUpload())
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }))
app.use('/app/v1', router)
app.use('/app/v1', userRoute)
app.use('/app/v1', paymentRoute)
app.use('/app/v1', orderRoute)
app.use(errorHandler)

module.exports = app
const axios = require('axios');
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser');
const errorHandler = require("./middlewares/error.js")
const router = require("./routes/routes.js")
const userRoute = require("./routes/userRoute.js")
const orderRoute = require("./routes/orderRoutes.js")
const cors = require('cors');
app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use('/app/v1', router)
app.use('/app/v1', userRoute)
app.use('/app/v1', orderRoute)
app.use(errorHandler)

module.exports = app
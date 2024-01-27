const cloudinary = require('cloudinary').v2;
app = require('./app')
dotenv = require("dotenv")
connectdatabase = require("./config/database")

process.on("uncaughtException", err => {
 console.log("Error: " + err);
 process.exit(1);
})

dotenv.config({ path: "backend/config/config.env" })

connectdatabase()

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET
});
const server = app.listen(process.env.PORT, () => {
 console.log(`listening on ${process.env.PORT}`);
})

process.on('unhandledRejection', err => {
 console.log("Error: " + err);
 server.close(() => {
  process.exit(1);
 });
})
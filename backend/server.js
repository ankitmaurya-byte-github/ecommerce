app=require('./app')
dotenv=require("dotenv")
connectdatabase=require("./config/database")

process.on("uncaughtException", err=>{
    console.log("Error: " + err);
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"})

connectdatabase()

const server=app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`);
})

process.on('unhandledRejection',err=>{
    console.log("Error: " + err);
    server.close(()=>{
        process.exit(1);
    }); 
})
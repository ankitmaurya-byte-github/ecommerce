
const mongoose=require('mongoose')
const connectdatabase=()=>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
}).then((data)=>{
    console.log("connected");
 console.log(data.connection.host)
}).catch((err)=>{
    console.log(err);
})
}

module.exports =connectdatabase

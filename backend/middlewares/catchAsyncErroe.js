module.exports=(productcontroller)=>(req,res,next)=>{
    Promise.resolve(productcontroller(req,res,next)).catch(next)
}
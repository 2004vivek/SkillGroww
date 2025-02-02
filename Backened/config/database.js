const mongoose=require("mongoose")
require("dotenv").config()
const dbconnect=()=>{
    mongoose.connect(process.env.URL)
    .then(result=>{
        console.log("connected to database successfully")
    })
    .catch(err=>{
        console.log(err)
    })
}
module.exports=dbconnect
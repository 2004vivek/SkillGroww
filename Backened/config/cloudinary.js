const cloundinary=require('cloudinary').v2
const connecttocloudinary=()=>{
    try {
        cloundinary.config({
            cloud_name:process.env.CLOUD_NAME,  
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    } catch (error) {
        console.log(error)
    }
}
exports.connecttocloudinary=connecttocloudinary
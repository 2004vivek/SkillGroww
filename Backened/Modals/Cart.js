const mongoose=require('mongoose')
const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses"
    }]
})
module.exports=mongoose.model('cart',CartSchema)
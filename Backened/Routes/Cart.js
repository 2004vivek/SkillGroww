const express=require('express')
const router=express.Router()
const {auth}=require('../Middleware/Auth')
const {addcartitem,getallcart,deletecart}=require("../Controllers/Cart")
router.post("/add-to-cart",auth,addcartitem)
router.get("/get-all-cart",auth,getallcart)
router.post("/delete-cart",deletecart)

module.exports=router;
const express=require("express")
const bodyParser = require('body-parser');
const router=express.Router()
const {orderCreate,verifySignature}=require('../Controllers/Payments')
const {isstudent,auth}=require('../Middleware/Auth')


router.post("/transaction",orderCreate)
router.post('/webhooks', bodyParser.raw({ type: 'application/json' }),verifySignature)

// router.post("/capturepayment",auth,isstudent,capturepayment)
// router.post("/verify-signature",verifySignature)

module.exports=router

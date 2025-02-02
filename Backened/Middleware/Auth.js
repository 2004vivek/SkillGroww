const jwt=require("jsonwebtoken")
require("dotenv").config()
//auth
const auth=(req,res,next)=>{
    try {
        const token=req.cookies.cookie||req.header("Authorization").replace("Bearer ", "").trim()||req.body
        // console.log("this is auth token"+token)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }
    try {
    //verify the token
    const decodeddata= jwt.verify(token,"vivek")
    // console.log("this is decoded data",decodeddata) 
    req.user=decodeddata
    next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            error:error.message,
            message:"Token is invalid or expired. Please log in again."
        })
    }
   
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"No token found"
        })
    }
    
}
//student
const isstudent=(req,res,next)=>{
    try {
        if(req.user.role!='Student'){
            return res.status(403).json({
                success:false,
                message:"this is protected route for student"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occured while accessing this route"
        })
    }
}
//instructor
const isinstructor=(req,res,next)=>{
    try {
        if(req.user.role!=='Instructor'){
            return res.status(403).json({
                success:false,
                message:"this is protected route for instructor"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occured while accessing this route"
        })
    }
}

//admin
const isadmin=(req,res,next)=>{
    try {
        if(req.user.role!=='Admin'){
            return res.status(403).json({
                success:false,
                message:"this is protected route for admin"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occured while accessing this route"
        })
    }
}
exports.auth=auth
exports.isstudent=isstudent
exports.isinstructor=isinstructor
exports.isadmin=isadmin
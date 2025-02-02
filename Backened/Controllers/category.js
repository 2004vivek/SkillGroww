const category=require('../Modals/Category')
const createcategory=async(req,res)=>{
try {
    //only admin can create a category
    //fetch data
    const {name,description}=req.body
    //validation
    if(!name||!description){
        return res.status(401).json({
            success:false,
            message:"All field are required"
        })
    }
    //create entry in DB
    const categorydetails=await category.create({
        name:name,
        description:description
    })
   console.log(categorydetails)
    return res.status(201).json({
        success:true,
        message:"Category created Successfully"
    })
    
} catch (error) {
    return res.status(500).json({
        success:false,
        error:error.message
    })
}
}
const getallcategory=async(req,res)=>{
try {
    const allcategory=await category.find({},{name:true,description:true})
    return res.status(200).json({
        success:true,
        category:allcategory,
        message:"all category returned"
    })


} catch (error) {
    return res.status(500).json({
        success:false,

        error:error.message
    })
}
}
exports.categorypagedetails=async(req,res)=>{
    try {
        //get category id
        const {categoryid}=req.body;     
        //get courses for specified category id 
        const allcategory=await category.findById({_id:categoryid}).populate({path:"course",match:{status:"Published"},populate:"ratingandreview"}).exec()
        
        //validation
        if(!allcategory){
            return res.status(404).json({
                success:false,
                message:"No course found"
            })
        }
        //get courses for different categories
        const differentcategory=await category.find({_id:{$ne:categoryid}}).populate({path:"course",match:{status:"Published"}}).exec()
        
        //get the top selling course
        const topcategory=await category.findById(categoryid).sort({rating:-1}).limit(2).populate({path:"course",match:{status:"Published"}}).exec()
        //return response
        return res.status(200).json({
            success:true,
            data:{
                allcategory,
                differentcategory,
                topcategory
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
exports.createcategory=createcategory
exports.getallcategory=getallcategory
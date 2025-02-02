import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/CoreComponent/Dashboard/ConfirmationModal";
export const CourseContext = createContext();
export const CourseContextProvider = ({ children }) => {
  const {formState: { errors, isSubmitSuccessful }}=useForm()
  const [allcourses,setallcourses]=useState(null)
    const [position,setposition]=useState(1);

    const [loader,setloader]=useState(false)

    const [course,setcourse]=useState(null)

    const [courseid,setcourseid]=useState("");

    const [editcourse,seteditcourse]=useState(false)

    const [editsection,seteditsection]=useState(false);

    const [sectionid,setsectionid]=useState(null)

    const [showsubsectionmodal,setshowsubsectionmodal]=useState(false);

    const [editsubsection,seteditsubsection]=useState(false)//for tracking the whether it is in edit or create

    const [addsubsection,setaddsubsection]=useState(null);

    const [viewsubsection,setviewsubsection]=useState(false)

    const [subsectionid,setsubsectionid]=useState(null)

    const [subsectionlist,setsubsectionlist]=useState(null);

    const [imagepreview, setimagepreview] = useState(null);

    const [status,setstatus]=useState('Draft');

    const [showdeleteshowmodal,setshowdeleteshowmodal]=useState(false);

    const [deletedcourseid,setdeletedcourseid]=useState(null);
    
    const [allcategory,setallcategory]=useState(null);

    const [differentcategory,setdifferentcategory]=useState(null);

    const [topcategory,settopcategory]=useState(null);

    const [coursedata,setcoursedata]=useState(null)

    //it is for handling the data from the form 
    const [coursecreation,setcoursecreation]=useState(null);

    const [edit,setedit]=useState(false);

    //it is used when fetching a data during edit
    const [modaldata,setmodaldata]=useState(null);   

    const [cartitem,setcartitem]=useState([]);

    const [totalprice,settotalprice]=useState(0)

    const [discountprice,setdiscountprice]=useState(0)

    const [videopreview,setvideopreview]=useState("")

    const [markcompleted,setmarkcompleted]=useState(false)

    const [rewatch,setrewatch]=useState(false)

    const [completedsubsectionid,setcompletedsubsectionid]=useState('');

    const [completedvideo,setcompletedvideo]=useState([]);

    //calculating total subsection
    const [totalsubsection,settotalsubsection]=useState(0);

    const [showreviewmodal,setshowreviewmodal]=useState(false);

    const courseCreationHandler=(data)=>{
      console.log("data",data)
      setcoursecreation({...coursecreation,data});
    }


    //fetch all the category page details
    const getCategoryPageHandler=async(categorypath,navigate)=>{
    
      const categoryurl=categorypath?.split("/")
      const categoryid=categoryurl?.pop()
      
      navigate(categorypath);
      try {
        setloader(true);
        const categorydetails=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getcategorydetails`,{categoryid})
        console.log("this is category page details",categorydetails.data.data.allcategory)
        setallcategory(categorydetails.data.data.allcategory);
        setdifferentcategory(categorydetails.data.data.differentcategory);
        settopcategory(categorydetails.data.data.topcategory)
        
      } catch (error) {
        console.log("error while fetching",error?.response?.data||error.message)
      }
      finally{
        setloader(false)
      }

    }

    
    // const handleBuyNow=()=>{

    // }
    console.log("this is cart item",cartitem)

    const AddtoCart=async(courseid)=>{
      const userdetails=JSON.parse(localStorage.getItem("usertype"));
      const token=localStorage.getItem("token");
      console.log("this is course id",coursedata?._id)
      try {
        setloader(true)
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/add-to-cart`,
          {courseid:coursedata._id},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        console.log("jiska muhje tha intezzar wo aa gya",response.data.message)
        toast.success(response?.message||response?.data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message||error?.response?.data||error?.message)
        console.log("erorrr!",error?.response?.data?.message)
      }
      finally{
        setloader(false);
      }
     
    }

    const removeCarthandler=async(courseid)=>{
      console.log("this is course id",courseid)
      try {
          const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/delete-cart`,{
              courseid:courseid
          })

          console.log("this is deleted cart",response.data.updatedcourse.product)
          const filteredcart=cartitem.filter((prev)=>prev._id!=courseid)
          toast.success("Successfully deleted from cart!")
          setcartitem(filteredcart)
      } catch (error) {
          toast.error('Failed to remove item from cart');
          console.log(error?.response?.data||error?.message)
      }
  }

    
    const value={
      allcourses,setallcourses,position,setposition,coursecreation,setcoursecreation,courseCreationHandler,editcourse,seteditcourse,course,setcourse,loader,setloader,editsection,seteditsection,sectionid,setsectionid,showsubsectionmodal,setshowsubsectionmodal,addsubsection,setaddsubsection,subsectionlist,setsubsectionlist,subsectionid,setsubsectionid,imagepreview, setimagepreview,modaldata,setmodaldata,edit,setedit,editsubsection,seteditsubsection,viewsubsection,setviewsubsection,status,setstatus,showdeleteshowmodal,setshowdeleteshowmodal,courseid,setcourseid,getCategoryPageHandler,allcategory,setallcategory,differentcategory,setdifferentcategory,topcategory,settopcategory,deletedcourseid,setdeletedcourseid,coursedata,setcoursedata,AddtoCart,cartitem,setcartitem,removeCarthandler,totalprice,settotalprice,discountprice,setdiscountprice,videopreview,setvideopreview,markcompleted,setmarkcompleted,rewatch,setrewatch,completedsubsectionid,setcompletedsubsectionid,completedvideo,setcompletedvideo,totalsubsection,settotalsubsection,showreviewmodal,setshowreviewmodal 
    }
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

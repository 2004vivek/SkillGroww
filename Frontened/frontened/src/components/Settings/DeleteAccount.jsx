import axios from 'axios';
import React, { useContext } from 'react'
import { MdOutlineAutoDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Appcontext } from '../../context/AppContext';
export default function DeleteAccount() {

  const navigate=useNavigate()

  const {logoutHandler}=useContext(Appcontext);
  const deleteUserAccount=async()=>{
    try {
      const user=JSON.parse(localStorage.getItem("usertype"))
      const userid=user._id;
      const token=localStorage.getItem("token");
      console.log("finalllyyy",userid)
      const response=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/deleteprofile/${userid}`,
        {
          headers:{
           "Authorization":`Bearer ${token}`,
          }
        }
      )
      console.log(response.data);
      toast.success(response?.data?.message)
      navigate("/login");
      logoutHandler(navigate);

    } catch (error) {
      console.log("Error:",error.response?.data)
      toast.error(error.response?.data||error.message)
    }
  }
  return (
    <div className='w-full bg-red-600/30 mt-4 '>
        <div className='w-11/12 m-auto py-3 flex items-center gap-3'>
        <div>
        <MdOutlineAutoDelete color='red' fontSize="30px"/>
        </div>
        <div>
        <h3 className=" text-[18px] text-[#ffcccc]  font-bold">
          Delete Account
        </h3>
        <p className="text-[hsl(0,94%,72%)] text-[14px]">Would you like to delete your account?</p>
        <p className="text-[hsl(0,94%,72%)] text-[14px]">This account may contain Paid Courses.Deleting your account is permanent and will remove all the associated with it.</p>
        <p className="text-[#e61919] text-[14px] cursor-pointer font-bold" onClick={deleteUserAccount}>I want to delete my account</p>
        </div>

        </div>
        
      
    </div>
  )
}

import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Appcontext } from "../../context/AppContext";
export default function Passwordupdate() {

  const {loading,setloading}=useContext(Appcontext);

  const navigate=useNavigate()

    const {
        register,
        reset,
        formState: {isSubmitSuccessful },
        handleSubmit,
      } = useForm();
    const [userdata,setuserdata]=useState(null);

      const profileFormHandler = async(data) => {
       
        const user=JSON.parse(localStorage.getItem("usertype"))
       const userdata={...data,email:user.email}
       const token=localStorage.getItem("token")
       setuserdata(userdata);

       try {
        setloading(true)
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/changepassword`,
          userdata,
          {
            headers:{
              "Authorization":`Bearer ${token}`,
          }
          }
        )
        console.log("kya hai",response.message)
         toast.success(response?.data?.message)
        
       } catch (error) {
        console.log(error.response?.data?.message)
        toast.error(error.response?.data?.message||error.message)
       }
       finally{
        setloading(false);
       }
        reset({
          oldpassword:"",
          newpassword:""
         })
      };
   

  return (
      <>
       {loading&&<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>}
    <div className="w-full bg-slate-900 mt-4">
            <div className="w-11/12 m-auto">
        <h3 className="text-white text-[18px] py-5 font-bold">
          Password
        </h3>
        <div className="w-11/12 ">
          <form
            action=""
            onSubmit={handleSubmit(profileFormHandler)}
            className="w-full "
          >
            <table className="w-[90%] border-separate border-spacing-3">
              <tr>
                <th className="text-[15px] font-bold">Current Password</th>
                <th className="text-[15px] font-bold">New Password</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Enter the old password"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    name='oldpassword'
                    {...register("oldpassword",{required:true})}

                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    placeholder="Enter the new password"
                    name='newpassword'
                    {...register("newpassword",{required:true})}
                  />
                </td>
              </tr>
             
            </table>
            <div className="flex w-[110%] justify-end gap-4 mt-4">
     <button type="button" className="btn bg-gray-300 text-black font-bold px-3 py-1 rounded hover:bg-gray-600" onClick={()=>navigate("/dashboard/my-profile")}>
         Cancel
       </button>
       
       <button type="submit"  className="btn bg-yellow-500 text-black font-bold px-3 py-1 rounded hover:bg-yellow-600">
         Update
       </button>
 
     </div>
          </form>
        </div>
      </div>
    </div>
     {/* buttons       */}
    
     </>
  )
}

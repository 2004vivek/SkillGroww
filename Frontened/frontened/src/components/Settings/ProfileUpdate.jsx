import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Appcontext } from "../../context/AppContext";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ProfileUpdate() {
    // const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm();

  const {profileinfo,setprofileinfo,loading,setloading}=useContext(Appcontext);
 
  
  const navigate=useNavigate();

  const profileFormHandler = async(data) => {
    try {
        const token=localStorage.getItem("token")
        setprofileinfo(data);
        setloading(true)
        const response=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/updateprofile`,
            data,
            {
                headers:{
                    "Authorization":`Bearer ${token}`,
                }
            }
        )
        console.log("this is response of profile update",response.data)
        const updateduserdetails=response.data.updateduserdetails;
        const updatedprofiledetails=response.data.profiledetails;
        localStorage.setItem("profile",JSON.stringify(response.data.profiledetails))
        localStorage.setItem("usertype",JSON.stringify(updateduserdetails))
        setprofileinfo(updatedprofiledetails);

        toast.success(response?.data?.message)

        
    } catch (error) {
        console.log(error.response?.data||error.message)
        toast.error(error.response?.data||error.message)
    }
    finally{
        reset({
            firstName:"",
            lastName:"",
            dob:"",
            phoneNumber:"",
            about:"",
            gender:""
        })
        setloading(false)
    }
  };


  return (
    <>
     {loading&&<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>}
    <div className="w-full bg-slate-900 mt-4 pb-5">
      <div className="w-11/12 m-auto">
        <h3 className="text-white text-[18px] py-5 font-bold">
          Profile Information
        </h3>
        <div className="w-11/12 ">
          <form
            action=""
            onSubmit={handleSubmit(profileFormHandler)}
            className="w-full "
          >
            <table className="w-[90%] border-separate border-spacing-4">
              <tr>
                <th className="text-[15px] font-bold">First Name</th>
                <th className="text-[15px] font-bold">Last Name</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Enter the first name"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    name="firstName"
                    {...register("firstName",{required:true})}
                  />
                   {/* {error} */}
                </td>
                <td>
                  <input
                    type="text"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    placeholder="Enter the last name"
                    name="lastName"
                    {...register("lastName",{required:true})}
                  />
                </td>
              </tr>
              <tr>
                <th className="text-[15px] font-bold">Date Of Birth</th>
                <th className="text-[15px] font-bold">Gender</th>
              </tr>
              <tr>
                <td>
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    name="dob"
                    {...register("dob",{required:true})}
                  />
                </td>
                <td>
                  <select
                    name=""
                    id=""
                    className="w-full py-[15px] text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    {...register("gender",{required:true})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th className="text-[15px] font-bold">Contact Number</th>
                <th className="text-[15px] font-bold">About</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="tel"
                    placeholder="Enter the Contact Number"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    name="phoneNumber"
                    {...register("phoneNumber",{required:true})}
                  />
                </td>
                <td>
                  
                  <input
                    type="text"
                    className="w-full text-[14px] bg-gray-800 rounded p-[8px] text-white mt-2"
                    placeholder="Enter Bio Details"
                    name="about"
                    {...register("about",{required:true})}
                  />
                </td>
              </tr>
            </table>
            {/* buttons       */}
    <div className="flex justify-end  w-[110%]  gap-4 mt-4">
    <button type="submit" className="btn bg-gray-300 text-black font-bold px-3 py-1 rounded hover:bg-gray-600" onClick={()=>navigate("/dashboard/my-profile")}>
        Cancel
      </button>
      
      <button type="submit"  className="btn bg-yellow-500 text-black font-bold px-3 py-1 rounded hover:bg-yellow-600">
        Save
      </button>

    </div>
          </form>
        </div>
      </div>   
    </div>
    
  
    </>
  );
}

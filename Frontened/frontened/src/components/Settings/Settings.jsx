import React, { useContext, useState } from 'react'
import ProfileUpdate from './ProfileUpdate';
import Passwordupdate from './Passwordupdate';
import DeleteAccount from './DeleteAccount';
import axios from 'axios';
import { Appcontext } from '../../context/AppContext';
import { toast } from 'react-toastify';
export default function Settings() {
    const user=JSON.parse(localStorage.getItem("usertype"));
    const [file,setfile]=useState(null)
    // console.log("sdfsdv", file?.name?.split(".")[1])

    const {imageUrl,setImageUrl,loading,setloading}=useContext(Appcontext);

    const ImageUploader=async()=>{
        try {
            const token=localStorage.getItem("token");

            //restrict the user from uploading video
            const ext=file?.name?.split(".")[1]
            const supportedformat=["png","jpeg","jpg","webp"]
            if(!supportedformat.includes(ext)){
                toast.error("Invalid file type. Please upload an image.")
                return;
            }
            console.log("extension",ext);
            // we have to make the file object 
            const formdata=new FormData()
            formdata.append("file",file)
            console.log("this is formdata",formdata)

            setloading(true);

            const response=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/update-pic`,
                formdata,
                {
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        // "Content-Type":"multipart/form-data"
                    }
                }

            )
            const updatedImageUrl = response.data.url;
            localStorage.setItem("imageurl",response.data.url)
            setImageUrl(updatedImageUrl)
          
            if(response.data.success===true){
                toast.success(response?.data?.message)
            }
            else{
                toast.error(response?.message?.error||error.message)
            }
            
        } catch (error) {
            toast.error(error.response.data?.message||error.message)
            console.log("error..........",error.response.data?.message)
        }
        finally{
            setloading(false);
        }
    }
  return (
    <>
    {loading&&<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-yellow-500 bg-opacity-50 z-50">Loading...</div>}
    <div className='text-2xl text-white w-full m-auto '>
       <h3 className='text-white lg:text-3xl font-bold'>My Profile</h3>
        <div className='w-full flex justify-between bg-slate-900 p-5 mt-4 items-center'>
               <div className='flex gap-2  '>
                   <div className='rounded-full  h-24 w-24  overflow-hidden m-2'><img src={imageUrl} alt="user-image" className='w-full h-full'/></div>
                   <div>
                   <div className='text-white text-[18px] font-bold flex flex-col '>
                    <div><span>Change Your Profile</span></div>
                   <div className='flex gap-2 mt-2'>
                    {/* labelfor is used to link the input tag  */}
                    <input type="file" className='hidden' id='fileinput' onChange={(e)=>{setfile(e.target.files[0])}}/>
                    <label htmlFor="fileinput" className='text-[16px] px-2 bg-slate-400/50 text-white font-semibold rounded-lg cursor-pointer'>{file!==null?file.name:"Choose File"}</label>
                    <div className='px-2 bg-yellow-400 text-black font-semibold rounded-lg cursor-pointer' onClick={ImageUploader}>
                          <span className='flex text-[16px] place-items-center gap-2 '>Upload</span>
                        </div>
                   </div>
                   </div>
                   </div>
               </div>
             </div>

             <ProfileUpdate/>
             <Passwordupdate/>
             <DeleteAccount/>
    </div>
    </>

  )
}

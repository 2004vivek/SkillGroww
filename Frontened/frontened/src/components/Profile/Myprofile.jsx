import React, { useContext } from 'react'
import ActionButton from '../CoreComponent/Dashboard/ActionButton';
import { useNavigate } from 'react-router-dom';
import { Appcontext } from '../../context/AppContext';
export default function Myprofile() {
    const user=JSON.parse(localStorage.getItem("usertype"));
    const navigate=useNavigate();
    const {imageUrl,profileinfo,loading}=useContext(Appcontext)
  return (
    <div className='text-white text-2xl w-full m-auto '>
      <h3 className='text-white lg:text-3xl md:text-[20px] text-[18px] font-bold'>My Profile</h3>
      <div className='w-full flex justify-between bg-slate-900 p-5 mt-4 items-center'>
        <div className='flex gap-2 '>
            <div className='rounded-full lg:h-24 lg:w-24 md:w-16 md:h-16 w-12  h-12 overflow-hidden'><img src={imageUrl} alt="user-image" className='w-full h-full'/></div>
            <div className='text-white 14lg:text-3xl md:text-[20px] text-[18px]  font-bold flex flex-col '><div><span>{user.firstName}</span><span>{user.lastName}</span></div>
            <div className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'>{user.email}</div>
            </div>
           
        </div>
        <div onClick={()=>navigate("/dashboard/setting")}><ActionButton text={"Edit"}/></div>
      </div>

      <div className='w-full flex justify-between bg-slate-900 p-5 mt-4 items-center'>
        <div className=''>
            <div className='text-white 14lg:text-3xl md:text-[20px] text-[18px]   font-bold flex flex-col '>
               About
            </div>
            <p className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400 mt-3'>{profileinfo?.about ?? "Write Something about Yourself!"}</p>
        </div>
        <div onClick={()=>navigate("/dashboard/setting")}><ActionButton text={"Edit"}/></div>
      </div>

      <div className='w-full flex max-sm:flex-col  justify-between bg-slate-900 p-5 mt-4 items-center'>
        <div className='w-full'>
            <div className='text-white 14lg:text-3xl md:text-[20px] text-[18px]  font-bold flex flex-col'>
               Personal Details
            </div>
            <div className='mt-3 lg:w-3/4 w-full'>
            <table border="1px" className='w-full'>
              <thead>
              <tr>
                <th className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'>First Name</th>
                <th className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'> Last Name</th>
                
              </tr>
              </thead>
             <tbody>
              <tr>
                <td className='lg:text-[14px] md:text-[14px] text-[12px] text-white'>{user?.firstName}</td>
                <td className='lg:text-[14px] md:text-[14px] text-[12px] text-white'>{user?.lastName}</td>
              </tr>
              <tr>
                <th className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'>Email</th>
                <th className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'>Phone Number</th>
              </tr>
              <tr>
                <td className='lg:text-[14px] md:text-[14px] text-[12px] text-white'>{user?.email}</td>
                <td className='lg:text-[14px] md:text-[14px] text-[12px] text-white'>{profileinfo?.phoneNumber??"Add Contact Number"}</td>
              </tr>
              <tr>
              <th className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'>Gender</th>
              <th className='lg:text-[14px] md:text-[14px] text-[12px] text-slate-400'>Date of Birth</th>
              </tr>
              <tr>
                <td className='lg:text-[14px] md:text-[14px] text-[12px] text-white'>{profileinfo?.gender??"Add a gender"}</td>
                <td className='lg:text-[14px] md:text-[14px] text-[12px] text-white'>{profileinfo?.dob??"Enter your dob"}</td>
              </tr>
              </tbody>
            </table>
            </div>
        </div>
        <div className='max-sm:mt-4 ' onClick={()=>navigate("/dashboard/setting")}><ActionButton text={"Edit"}/></div>
      </div>
    </div>
  )
}

import React, { useContext } from 'react'
import sidebardata from '../../../../data/sidebardata'
import { Link, useLocation } from 'react-router-dom'
import { Appcontext } from '../../../context/AppContext'
import ConfirmationModal from './ConfirmationModal'
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'
import { CourseContext } from '../../../context/CourseContext'
export default function Sidebar() {
    const {showmodal,setshowmodal}=useContext(Appcontext);
    const usertype=JSON.parse(localStorage.getItem("usertype"));
    const role=usertype?.role;
    const userid=usertype?._id;
    const location=useLocation();
    console.log("this is location",location.pathname)
    console.log("this is current route",location.pathname)
    const {logoutHandler}=useContext(Appcontext)
    const {setposition,setcourse,editcourse,seteditcourse}=useContext(CourseContext)
    const navigate=useNavigate()
  
  return (
    <div className='min-w-[250px] p-2  bg-slate-900 '>
      {
        sidebardata.map((data, index) => {
            if (data.path === role ||  !data.path) {
              return (
                <Link to={typeof data.route==='function'?data.route(userid):data.route} key={data.route}>
                  <div  className={`flex gap-2 w-full h-[44px] ${ location.pathname.startsWith(typeof data.route === 'function' ? data.route(userid) : data.route) ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow-lg border-l-4" : "text-gray-400 hover:text-white"} my-5 px-2 items-center`} onClick={() => {
                   if (data.name === "Add Courses") {
                    setposition(1);
                    seteditcourse(false)
                                }
                                    }}>
                    <div>{data.icons}</div>
                    <div>{data.name}</div>
                  </div>
                </Link>
              );
            }
            return null; 
          })
      }
      <div className='w-11/12 m-auto border-[0.2px] rounded-md border-slate-700'></div>

     { 
     [{"name":"Settings","route":"/dashboard/setting","icons":<IoIosSettings fontSize="18px"/>}].map((data)=>(
      <Link to={data.route}><div className={`flex cursor-pointer gap-2 items-center w-full h-[44px] ${location.pathname===data.route?"bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow-lg border-l-4": "text-gray-400 hover:text-white"} my-5 px-2 items-center`}><span>{data.icons}</span><span>{data.name}</span></div></Link>
     ))
     }

     {
       [{"name":"Logout","icons":<RiLogoutBoxRLine  fontSize="18px"/> }].map((data)=>(
        <div className={`flex gap-2 cursor-pointer w-full h-[44px] ${location.pathname===data.route?"bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow-lg border-l-4": "text-gray-400 hover:text-white"} my-5 px-2 items-center`} onClick={()=>setshowmodal(true)}><span>{data.icons}</span><span>{data.name}</span></div>
       ))
     }
     <ConfirmationModal showmodal={showmodal} onclose={()=>setshowmodal(false)} heading={"Are You Sure ?"} content={"You Will be Logged out of your Account."} btn1text={"Logout"} btn2text={"Cancel"} btn1handler={()=>logoutHandler(navigate)} btn2handler={()=>setshowmodal(false)}/>
    </div>
  )
}

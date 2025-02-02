import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
const Navbar = () => {
  const location=useLocation();
  const {logoutHandler,token,imageUrl,subcategory,setsubcategory} = useContext(Appcontext);
  const {getCategoryPageHandler}=useContext(CourseContext);
  const imageurl=localStorage.getItem("imageurl");
  const [visible, invisible] = useState(false);
  const showLoginOption = () => {
    invisible(!visible);
  };
    
  

  const getallcategory=async()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getallcategory`)
      console.log("this is category",response.data)
      setsubcategory(response.data.category)
    } catch (error) {
      console.log(error||response.error)
    }
  }
  console.log("this is category after fetching",subcategory)
  useEffect(() => {
    getallcategory()
  }, [])

  const navigate=useNavigate();
  

  return (
    <>
      <div className="flex justify-around items-center w-[100%] mx-auto h-[100px]  py-2 bg-[#080e1a] drop-shadow-2xl sticky z-[100]  top-0 ">
        <div className="rounded-lg  overflow-hidden">
          <Link to="/"><img
            src="course-logo.webp"
            alt="course-logo"
            className="h-[75px] w-auto object-cover cursor-pointer"
          /></Link>
        </div>
        <nav className="flex gap-x-6 text-white">
          <Link to="/" className={`lg:text-[20px] lg:block text-[18px] hidden ${location.pathname==="/"?"text-yellow-400":"text-white"}` }>
            Home
          </Link>
         
           <div className={`lg:text-[20px] lg:flex text-[18px] hidden  relative group`}>
           <div className="lg:flex items-center justify-center gap-1 cursor-pointer">Catalog <span className=""><IoIosArrowDown fontSize="16px"/></span></div> 
           
           <div className="invisible z-50 opacity-0 absolute top-[500%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[150px] h-fit bg-white group-hover:visible group-hover:opacity-100 transition-all duration-200 p-2 rounded-md">
            {
             subcategory?.length?
              (
              <div>
               {
               subcategory.map((link,index)=>{
  
                  return (
                   
                    <div key={index} className="text-black text-[16px] cursor-pointer space-y-2 p-2 hover:bg-slate-200 my-2 rounded-md z-50" onClick={()=>getCategoryPageHandler(`/category/${link._id}`,navigate)}>{link.name}</div>
                   
                  )
                })
               }

              </div>
              ):
              (<div></div>)
            }
            <div className="absolute bg-white left-[50%] h-4 w-4 translate-x-[-50%] translate-y-[-40%] rounded-sm rotate-45 top-0 text-black"></div>
            </div>
            </div> 
         
          <Link to="/about" className={`lg:text-[20px] lg:block text-[18px] hidden ${location.pathname==="/about"?"text-yellow-400":"text-white"}`}>
            About
          </Link>
          <Link to="/contact" className={`lg:text-[20px] lg:block text-[18px] hidden ${location.pathname==="/contact"?"text-yellow-400":"text-white"}`}>
            Contact
          </Link>
        </nav>
        <div className="flex">

          {token===null && (
            <Link to="/login">
              <button className="bg-slate-600 border-none outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold mr-3">
                Login
              </button>
            </Link>
          )}

          {token===null && (
            <Link to="/signup">
              <button className="bg-slate-600 border-none outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold">
                Signup
              </button>
            </Link>
          )}

          {token!==null && (
            <>
              <div className="w-10 h-10 rounded-full mr-1  overflow-hidden">
                <img
                  className="w-full h-full"
                  src={imageUrl}
                  alt="user profile"
                />
              </div>
              <span
                className="flex items-center cursor-pointer relative"
                onClick={showLoginOption}
              >
                <TiArrowSortedDown color="grey" fontSize="20px" />
                {visible ? (
                  <div className="text-gray-200 absolute top-[150%] left-[-200%] z-50 bg-slate-700 rounded hover:overflow-hidden ">
                    <div className="hover:bg-slate-600  flex px-4 py-2">
                      <span className="flex items-center pr-1">
                        <MdDashboard />
                      </span>
                      <Link to="/dashboard/my-profile"><span>Dashboard</span></Link>
                    </div>{" "}
                    <div className="hover:bg-slate-600 flex px-4 py-2">
                      <span  className="flex items-center pr-1">
                        <FiLogOut />
                      </span>
                   <span onClick={()=>logoutHandler(navigate)}>Logout</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </span>
            </>
          )}

          {/* {isloggedin&&<Link to="/"><button className='bg-slate-600 border-none outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold' onClick={logoutHandler}>Logout</button></Link>}

     {isloggedin&&<Link to="/"><button className='bg-slate-600 border-none outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold'>Dashboard</button></Link>} */}
        </div>
      </div>
    </>
  );
};

export default Navbar;

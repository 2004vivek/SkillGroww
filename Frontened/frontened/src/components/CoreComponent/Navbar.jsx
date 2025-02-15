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
import { IoReorderThree } from "react-icons/io5";
import { motion } from "framer-motion";
import { AiFillHome } from "react-icons/ai";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

import { FaBook, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { logoutHandler, token, imageUrl, subcategory, setsubcategory } =
    useContext(Appcontext);
  const { getCategoryPageHandler } = useContext(CourseContext);
  const imageurl = localStorage.getItem("imageurl");
  const [visible, invisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const showLoginOption = () => {
    invisible(!visible);
  };

  const getallcategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/getallcategory`
      );
      console.log("this is category", response.data);
      setsubcategory(response.data.category);
    } catch (error) {
      console.log(error || response.error);
    }
  };

  console.log("this is category after fetching", subcategory);

  useEffect(() => {
    getallcategory();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [iscatalogopen, setiscatalogpen] = useState(false);

  const toggleCatalog = () => {
    setiscatalogpen((prev) => !prev);
  };

  const showoptionsvariant = {
    hidden: { opacity: 0, x: -100 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + index * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    }),
  };

  return (
    <>
      <div className="flex justify-around items-center w-[100%] mx-auto h-[100px] py-2 bg-[#080e1a] drop-shadow-2xl sticky z-[100] top-0">
        <div className="rounded-lg overflow-hidden">
          <Link to="/">
            <img
              src="course-logo.webp"
              alt="course-logo"
              className="h-[75px] w-auto object-cover cursor-pointer"
            />
          </Link>
        </div>
        <nav className="flex gap-x-6 text-white">
          <Link
            to="/"
            className={`lg:text-[20px] lg:block text-[18px] hidden ${
              location.pathname === "/" ? "text-yellow-400" : "text-white"
            }`}
          >
            Home
          </Link>

          <div
            className={`lg:text-[20px] lg:flex text-[18px] hidden relative group`}
          >
            <div className="lg:flex items-center justify-center gap-1 cursor-pointer">
              Catalog{" "}
              <span>
                <IoIosArrowDown fontSize="16px" />
              </span>
            </div>

            <div className="invisible z-50 opacity-0 absolute top-[500%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[150px] h-fit bg-white group-hover:visible group-hover:opacity-100 transition-all duration-200 p-2 rounded-md">
              {subcategory?.length ? (
                <div>
                  {subcategory.map((link, index) => (
                    <div
                      key={index}
                      className="text-black text-[16px] cursor-pointer space-y-2 p-2 hover:bg-slate-200 my-2 rounded-md z-50"
                      onClick={() =>
                        getCategoryPageHandler(
                          `/category/${link._id}`,
                          navigate
                        )
                      }
                    >
                      {link.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
              <div className="absolute bg-white left-[50%] h-4 w-4 translate-x-[-50%] translate-y-[-40%] rounded-sm rotate-45 top-0 text-black"></div>
            </div>
          </div>

          <Link
            to="/about"
            className={`lg:text-[20px] lg:block text-[18px] hidden ${
              location.pathname === "/about" ? "text-yellow-400" : "text-white"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`lg:text-[20px] lg:block text-[18px] hidden ${
              location.pathname === "/contact"
                ? "text-yellow-400"
                : "text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center">
          {token === null && (
            <Link to="/login">
              <button className="bg-slate-600 border-none lg:block hidden outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold mr-3">
                Login
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="bg-slate-600 border-none outline-none lg:block hidden md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold">
                Signup
              </button>
            </Link>
          )}

          {token !== null && (
            <>
              <div className="w-10 h-10 rounded-full mr-1 overflow-hidden">
                <img
                  className="w-full h-full"
                  src={imageUrl}
                  alt="user profile"
                />
              </div>
              <span
                className="lg:flex hidden items-center cursor-pointer relative"
                onClick={showLoginOption}
              >
                <TiArrowSortedDown color="grey" fontSize="20px" />
                {visible && (
                  <div className="text-gray-200 absolute top-[150%] left-[-200%] z-50 bg-slate-700 rounded hover:overflow-hidden">
                    <div className="hover:bg-slate-600 flex px-4 py-2">
                      <span className="flex items-center pr-1">
                        <MdDashboard />
                      </span>
                      <Link to="/dashboard/my-profile">
                        <span>Dashboard</span>
                      </Link>
                    </div>
                    <div className="hover:bg-slate-600 flex px-4 py-2">
                      <span className="flex items-center pr-1">
                        <FiLogOut />
                      </span>
                      <span onClick={() => logoutHandler(navigate)}>
                        Logout
                      </span>
                    </div>
                  </div>
                )}
              </span>
            </>
          )}

          <div className="lg:hidden block cursor-pointer" onClick={toggleSidebar}>
            <IoReorderThree color="white" fontSize={30} />
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="fixed top-0 left-0 w-64 h-full bg-[#080e1a] shadow-md z-[200] p-2 lg:hidden flex flex-col overflow-y-auto "
        >
          <button
            onClick={toggleSidebar}
            className="text-white text-xl self-end px-4 py-2 mb-4"
          >
            ✖
          </button>

          <motion.div
            custom={0}
            variants={showoptionsvariant}
            initial="hidden"
            animate="visible"
            className="flex items-center text-white text-lg py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer mt-4 border-b-gray-100 border-b-1"
          >
            <AiFillHome className="mr-3" size={22} />
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </motion.div>

          <motion.div
            custom={1}
            variants={showoptionsvariant}
            initial="hidden"
            animate="visible"
            className="flex items-center text-white text-lg py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer mt-4 "
          >
            <MdDashboard className="mr-3" size={22} />
            <Link to="/dashboard/my-profile" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </motion.div>

          <motion.div
            custom={2}
            variants={showoptionsvariant}
            initial="hidden"
            animate="visible"
            onClick={toggleCatalog}
            className="flex items-center justify-between text-white text-lg py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer mt-4"
          >
            <div className="flex items-center">
              <FaBook className="mr-3" size={20} />
              Catalog
            </div>
            <IoIosArrowDown
              size={18}
              className={`${
                iscatalogopen ? "rotate-180" : ""
              } transition-transform`}
            />
          </motion.div>

          {iscatalogopen && (
            <motion.div
              initial="hidden"
              animate="visible"
              className="ml-8 mt-2 space-y-2"
            >
              {subcategory?.length > 0 &&
                subcategory.map((link, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={showoptionsvariant}
                    initial="hidden"
                    animate="visible"
                    className="text-gray-300 text-md py-2 px-4 hover:bg-gray-700 rounded-lg cursor-pointer"
                    onClick={() =>
                      getCategoryPageHandler(`/category/${link._id}`, navigate)
                    }
                  >
                    {link.name}
                  </motion.div>
                ))}
            </motion.div>
          )}

          <motion.div
            custom={4}
            variants={showoptionsvariant}
            initial="hidden"
            animate="visible"
            className="flex items-center text-white text-lg py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer mt-4"
          >
            <FaInfoCircle className="mr-3" size={22} />
            <Link to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </motion.div>

          <motion.div
            custom={5}
            variants={showoptionsvariant}
            initial="hidden"
            animate="visible"
            className="flex items-center text-white text-lg py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer mt-4"
          >
            <FaEnvelope className="mr-3" size={22} />
            <Link to="/contact" onClick={toggleSidebar}>
              Contact
            </Link>
          </motion.div>

          {token !== null && (
            <motion.div
              custom={6}
              variants={showoptionsvariant}
              initial="hidden"
              animate="visible"
              className="flex items-center text-white text-lg py-3 px-4 mt-auto mb-4 hover:bg-red-700 rounded-lg cursor-pointer justify-center"
              onClick={() => logoutHandler(navigate)}
            >
              <FiLogOut className="mr-3" size={22} />
              Logout
            </motion.div>
          )}

          <motion.div className="flex my-10 ">
            {token === null && (
              <Link to="/login" onClick={toggleSidebar}>
                <button className="flex items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 border-none outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold mr-3 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <FiLogIn className="mr-3" size={22} />
                  Login
                </button>
              </Link>
            )}

            {token === null && (
              <Link to="/signup" onClick={toggleSidebar}>
                <button className="flex items-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 border-none outline-none md:py-2 py-1 lg:px-5 px-3 rounded-md text-white lg:font-medium font-semibold transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <FiUserPlus className="mr-3" size={22} />
                  Signup
                </button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;

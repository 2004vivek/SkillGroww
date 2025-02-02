import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Company = ["About", "Courses"];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Subject = [

  "Cloud Computing",
  "Code Foundations",
  "Computer Science",
  "DevOps",
  "Game Development",
  "Mobile Development",
  "Web Design",
  "Web Development",
];
const Languages=[
    "C++",
    "HTML & CSS",
    "Java",
    "JavaScript",
   "React",
    "Python",
    "SQL",
  
]

export default function Footer() {
  return (
    <div className="bg-slate-800 w-[100%] mt-4">
      <div className="w-[85%] m-auto flex justify-evenly py-6">
        <div className="flex flex-col">
          <h3 className="md:text-3xl text-[20px]  font-bold text-yellow-400">SkillGrow</h3>
          <div className="">
          <h3 className="md:text-lg text-[16px] font-semibold text-white mt-2">Company</h3>
          <div>
            {Company.map((data,index)=>{
                return(
                    <div key={index} className="text-slate-400 md:text-[16px] text-[14px] cursor-pointer hover:underline">{data}</div>
                )
            })}
          </div>
          <div className="flex flex-wrap text-slate-400 mt-4 gap-3 cursor-pointer">
          <FaFacebookF fontSize="16px"/>
          <FaLinkedinIn fontSize="16px"/>
          <FaYoutube fontSize="16px"/>
          <FaWhatsapp fontSize="16px"/>
          </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="">
          <h3 className="md:text-lg text-[16px] font-semibold text-white mt-2">Resources</h3>
          <div>
            {Resources.map((data,index)=>{
                return(
                    <div key={index} className="text-slate-400 md:text-[16px] text-[14px] cursor-pointer hover:underline">{data}</div>
                )
            })}
          </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="hidden md:block">
          <h3 className="text-lg font-semibold text-white mt-2">Plans</h3>
          <div>
            {Plans.map((data,index)=>{
                return(
                    <div key={index} className="text-slate-400 cursor-pointer hover:underline">{data}</div>
                )
            })}
          </div>
          <h3 className="text-lg font-semibold text-white mt-4 ">Community</h3>
          <div>
            {Community.map((data,index)=>{
                return(
                    <div key={index} className="text-slate-400 cursor-pointer hover:underline">{data}</div>
                )
            })}
          </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="hidden lg:block">
          <h3 className="text-lg font-semibold text-white mt-2">Subjects</h3>
          <div>
            {Subject.map((data,index)=>{
                return(
                    <div key={index} className="text-slate-400 cursor-pointer hover:underline">{data}</div>
                )
            })}
          </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="">
          <h3 className="md:text-lg text-[16px] font-semibold text-white mt-2">Languages</h3>
          <div>
            {Languages.map((data,index)=>{
                return(
                    <div key={index} className="text-slate-400 md:text-[16px] text-[14px] cursor-pointer hover:underline">{data}</div>
                )
            })}
          </div>
          </div>
        </div>


        <div></div>
      </div>
    </div>
  );
}

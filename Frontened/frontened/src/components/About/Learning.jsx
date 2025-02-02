import React from "react";

export default function Learning() {
  return (
    <div className="w-full  flex text-white flex-col">

      <div className="flex text-white justify-center flex-wrap   item-center  ">
        <div className="h-[300px] w-[600px] flex  flex-col justify-center md:m-4 my-4 xl:m-0 ">
          <h3 className="text-2xl xl:text-3xl  text-white font-bold">World-Class Learning for</h3>
          <h3 className="text-2xl xl:text-3xl  bg-gradient-to-r from-sky-500 via-slate-300 to-blue-700 bg-clip-text text-transparent font-bold mb-4">
            Anyone,Anywhere
          </h3>
          <p className="text-slate-400 mb-4 ">
            SkillGrow partners with more than
            150+ leading universities and companies to bring flexible,
            affordable, job-relevant online learning to individuals and
            organizations worldwide.
          </p>
         <div><button className=" bg-yellow-400 text-black p-1 rounded font-semibold">
            Learn More
          </button>
          </div>
        </div>
        <div className=" h-[250px] w-[250px] lg:w-[300px] lg:h-[300px]  flex justify-center align-items flex-col bg-slate-900 p-6 md:m-4 my-4  xl:m-0 ">
          <h3 className="text-xl text-white  mb-4">
            Curriculum Based on Industry Needs
          </h3>
          <p className="text-slate-400 ">
            Save time and money! The curriculum is made to be easier to
            understand and is line with indusrty needs
          </p>
        </div>
        <div className="  h-[250px] w-[250px] lg:w-[300px] lg:h-[300px] flex justify-center align-items flex-col bg-transparent p-6 md:m-4 my-4 xl:m-0 ">
          <h3 className="text-xl text-white  mb-4">Our Learning Methods</h3>
          <p className="text-slate-400 ">
            StudyGrow partners with more than 150+ leading univerisities and
            companies to bring
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-wrap items-center ">
      <div className='xl:h-[300px] xl:w-[300px] h-0 w-0'></div>
        <div className=" h-[250px] w-[250px] lg:w-[300px] lg:h-[300px] flex justify-center align-items flex-col bg-slate-900 p-6 md:m-4 my-4 xl:m-0 ">
          <h3 className="text-xl text-white  mb-4">Certification</h3>
          <p className="text-slate-400 ">
            StudyGrow partners with more than 150+ leading univerisities and
            companies to bring
          </p>
        </div>
        <div className=" h-[250px] w-[250px] lg:w-[300px] lg:h-[300px] flex justify-center align-items flex-col bg-transparent p-6 md:m-4 my-4 xl:m-0 ">
          {" "}
          <h3 className="text-xl text-white  mb-4">Rating Auto-grading</h3>
          <p className="text-slate-400 ">
            StudyGrow partners with more than 150+ leading univerisities and
            companies to bring
          </p>
        </div>
        <div className="  h-[250px] w-[250px] lg:w-[300px] lg:h-[300px] flex justify-center align-items flex-col bg-slate-900 p-6 md:m-4 my-4 xl:m-0 ">
          <h3 className="text-xl text-white mb-4">Ready To work</h3>
          <p className="text-slate-400 ">
            StudyGrow partners with more than 150+ leading univerisities and
            companies to bring
          </p>
          
        </div>
      </div>
    </div>
  );
}

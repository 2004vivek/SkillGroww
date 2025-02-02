import React from "react";
import timelinedata from "../../../data/timeline";

export default function TimeLineSection() {
  return (
    <div className="lg:w-[85%] w-[90%] m-auto flex md:flex-row flex-col mt-10 ">
      <div className="md:w-[40%] w-auto">
        {timelinedata.map((data, index) => {
          return (
            <div key={index} className="flex items-center my-6">
              <div className="mr-4">{data.icons}</div>
              <div>
                <h3 className="font-semibold xl:text-[18px] text-[16px]">{data.title}</h3>
                <p className="font-medium xl:text-[16px] text-[14px]">{data.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="md:w-[60%] w-auto flex justify-end">
        <div className="lg:h-[350px] lg:w-[650px] h-[300px] w-[400px] relative rounded shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] shadow-blue-500">
          <div
            className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-full h-[300px] 
                 bg-[radial-gradient(ellipse_at_top,_rgba(0,152,255,0.8)_0%,_rgba(0,152,255,0.2)_50%,_rgba(0,0,0,0)_80%)] 
                 opacity-90 blur-3xl "
          ></div>
          <div className="absolute rounded-lg z-50 lg:py-6 lg:px-3 py-3 px-3 left-[50%] translate-x-[-50%] translate-y-[50%] bottom-0 flex flex-row gap-5 bg-green-800 uppercase text-white">
            <div className="flex items-center border-r-2 pr-4  ">
                <p className="lg:text-3xl text-[24px] text-green font-semibold mr-2">10</p>
                <p className="lg:text-sm text-[10px]">Year Of Experience</p>
            </div>
            <div className="flex items-center ">
            <p className="lg:text-3xl text-[24px]  text-green font-semibold mr-2">250</p>
            <p className="lg:text-sm text-[10px]">TYPES OF COURSES</p>
            </div>
          </div>
          <img
            src="timelinepic.jpeg"
            alt="timelinepic"
            className="h-full w-full rounded-md relative z-10"
          />
        </div>
      </div>
    </div>
  );
}

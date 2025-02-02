import React from "react";
import ActionButton from "./ActionButton";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
export default function CodeBlocks({
  para,
  heading,
  colortext,
  codecontent,
  btn1content,
  btn2content,
  codecolor,
  codesection
}) {
  return (
    <>
      <div className="lg:w-[50%] w-auto mr-3">
        <div>
          <h3 className="md:text-2xl text-[20px] xl:text-3xl font-bold text-white mb-4">
            {heading}{" "}
            <span className="md:text-2xl text-[20px] xl:text-3xl  bg-gradient-to-r from-sky-500 via-slate-300 to-blue-700 bg-clip-text text-transparent font-bold mb-4">
              {colortext}
            </span>{" "}
          </h3>
        </div>
        <div className="">
          <p className="text-slate-400 max-w-[87%] text-[14px] md:text-[16px]">{para}</p>
        </div>
        <div className="flex gap-8 mt-6">
          <ActionButton active={true} linkto={"/signup"}>
            {btn1content}
            <span className="inline-block ml-2">
              {" "}
              <FaArrowRight fontSize="14px" />
            </span>
          </ActionButton>
          <ActionButton active={false} link={"/"}>
            {btn2content}
          </ActionButton>
        </div>
      </div>
      <div
        className={`lg:w-[40%]  py-2  md:w-[85%] w-full mt-6 lg:mt-0 mr-6 ${codecolor} relative z-10 whitespace-pre-wrap flex justify-center h-[280px]  bg-slate-950 overflow-hidden border-slate-800 border-[1px] rounded-lg my-2`}
      >
        {
          codesection==="1"?(<div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[220px]  bg-[radial-gradient(ellipse_at_top,_rgba(255,223,0,0.7)_0%,_rgba(0,0,0,0)_80%)] opacity-75 blur-3xl -z-10"></div>):(<>
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[220px] bg-[radial-gradient(ellipse_at_top,_rgba(0,122,255,0.7)_0%,_rgba(0,0,0,0)_80%)] opacity-75 blur-3xl -z-10"></div></>)
        }
     
        <div className="w-[10%]  text-white text-center border-r-[3px] mr-2 border-slate-900 text-sm md:text-[16px]">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
        </div>
        <div className="w-[90%]  text-sm md:text-[16px]">
          <TypeAnimation
            sequence={[codecontent, 5000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </>
  );
}

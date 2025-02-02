import React from "react";
import ColorButton from "../CoreComponent/ColorButton";
import ActionButton from "../CoreComponent/ActionButton";
import { FaArrowRight } from "react-icons/fa6";
export default function InstructorSection() {
  return (
    <>
      <div className="md:w-[50%] w-auto  flex justify-center items-center  mt-4 mb-5">
        <div className=" w-[80%] ">
          <img
            src="instructor.jpeg"
            alt="instructor"
            className="w-full h-full shadow-white shadow-[10px_10px_0_0]"
          />
        </div>
      </div>
      <div className="md:w-[50%]  w-auto  mt-4">
        <h3 className="md:text-2xl text-[20px] xl:text-3xl text-white font-bold">
          Become an <ColorButton className="font-bold" text={"Instructor"} />
        </h3>
        <p className="text-slate-400 mt-4 mb-6 text-[14px] md:text-[16px]">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <ActionButton active={true} linkto={"/signup"}>
          Start Teaching Today
          <span className="inline-block ml-2">
            {" "}
            <FaArrowRight fontSize="14px" />
          </span>
        </ActionButton>
      </div>
    </>
  );
}

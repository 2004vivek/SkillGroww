import React, { useContext } from "react";
import StepController from "./StepController";
import CourseTips from "./CourseTips";
import { CourseContext } from "../../../context/CourseContext";
export default function AddCourse() {
  const {editcourse}=useContext(CourseContext);
  return (
    <div className="text-2xl text-white">
      <h3 className="text-white lg:text-3xl font-bold">{editcourse?"Edit Course":"Add Course"}</h3>
      <div className="w-full gap-4 flex justify-between">
        <div className="w-[60%]">
          <StepController />
        </div>
        <div className="w-[40%] max-h-fit p-5 bg-slate-900 rounded-md">
          <CourseTips />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Navbar from "../CoreComponent/Navbar";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ActionButton from "../CoreComponent/ActionButton";
import CodeBlocks from "../CoreComponent/CodeBlocks";
import ColorButton from "../CoreComponent/ColorButton";
import TimeLineSection from "./TimeLineSection";
import LearningLanguage from "./LearningLanguage";
import InstructorSection from './InstructorSection'
import Footer from "../CoreComponent/Footer";
import HomePageExplorer from "./HomePageExplorer";
import RatingSlider from "./RatingSlider";
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* section1 */}
      <section className="mb-10 w-full">
        <div className="w-11/12 m-auto  flex justify-center mt-8 flex-col items-center">
          <Link to="/signup">
            <button className="text-gray-400 text-[16px] flex items-center bg-slate-800 py-2 px-5 rounded-full cursor-pointer  shadow-[-3px_3px_0_0] shadow-yellow-500">
              <span className="mr-2">Become an instructor </span>
              <span>
                <FaArrowRight fontSize="12px" />
              </span>
            </button>
          </Link>

          <div className="text-white md:text-2xl text-[20px] xl:text-3xl font-bold mb-3">
            <h3 className="text-center mt-4">
              Empower Your Future With{" "}
              <span className=" font-bold  text-center bg-gradient-to-b from-sky-300 via-purple-400  to-blue-500 bg-clip-text text-transparent">
                Coding Skills
              </span>
            </h3>
          </div>

          <div className="xl:w-[68%]  w-auto text-slate-400 mt-2 md:text-center text-[14px] md:text-[16px]">
            <p>
              With Our Online Coding courses,you can learn at yor own pace, from
              anywhere in the world,and get access to a wealth of
              resources,including hands-on projects,quizzes ,and personalised
              feedback from instructors.
            </p>
          </div>

          <div className="flex justify-center mt-6 gap-3">
            <ActionButton active={true} linkto={"/signup"}>
              Learn More
            </ActionButton>
            <ActionButton active={false} linkto={"/login"}>
              Book A Demo
            </ActionButton>
          </div>
          <div className="w-[80%] mb-10 mt-14 flex justify-center ">
            <div className="relative w-[950px] h-[450px] z-10 shadow-lg ">
              <video className=" w-full h-full object-cover shadow-[10px_10px_0px_0px] shadow-blue-600" muted autoPlay loop>
                <source src="video2.mp4" type="video/mp4" />
              </video>
             
              <div className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(0,122,255,0.7)_0%,_rgba(0,0,0,0)_80%)] opacity-75 blur-3xl -z-10" ></div>
            </div>
          </div>

          {/* code section1 */}
          <div className="lg:w-[90%] w-auto flex flex-col lg:flex-row mt-3">
            <CodeBlocks
              heading="Unlock our online courses with your"
              colortext="coding potential"
              para="Go ahead,give it a try.Our hands-on learning environment means you'll be writig real code from your very first lesson"
              btn1content="Try It Yourself"
              btn2content="Learn More"
              codecontent={`<!DOCTYPE html>\n<html>\n<head>\n<title  class="text-red-500">Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a><a href="one/">Two</a>\n<nav>\n</body>\n</html>`}
              codecolor="text-yellow-500"
              codesection="1"
            />
          </div>

          {/* code section2 */}
          <div className="lg:w-[90%] w-auto flex-col lg:flex-row-reverse flex  mt-10">
            <CodeBlocks
              heading="Start"
              colortext="coding in seconds"
              para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
              btn1content="Continue Lesson"
              btn2content="Learn More"
              codecontent={`<!DOCTYPE html>\n<html>\n<head>\n<title  class="text-red-500">Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a><a href="one/">Two</a>\n<nav>\n</body>\n</html>`}
              codecolor="text-blue-500"
              codesection="2"
            />
          </div>
          <HomePageExplorer></HomePageExplorer>
        </div>
      </section>

      {/* section2 */}
      <section>
        <div className="bg-white w-[100%]">
          <div className="w-full relative xl:h-[300px] h-[200px] bg-[url('homebg.jpg')]  bg-no-repeat bg-cover bg-center text-yellow-600">
          <div className="absolute inset-0 bg-white  opacity-50"></div>
            <div className="w-11/12 relative z-10 h-full m-auto  flex justify-center gap-6 items-center ">
            <div className="">
            <ActionButton active={true} linkto="/">
              <div className="flex item-center justify-center "><span>Explore Full Catalog</span>  <span><FaArrowRight fontSize="14px" /></span></div>
            </ActionButton>
            </div>
            <div className="">
            <ActionButton active={false} linkto="/">
              <span>Learn More</span>
            </ActionButton>
            </div>
            </div>
          </div>

          {/* second subsection */}
          <div className="w-[85%] sm:w-[90%] lg:w-[85%]  m-auto mt-5">
          <div className="w-full flex justify-between md:flex-row flex-col">
            <div className="md:w-[50%] w-auto">
            <h3 className="md:text-2xl text-[20px] xl:text-3xl font-bold">Get the skills you need for a <ColorButton className="md:text-2xl text-[20px] xl:text-3xl font-bold" text={"job that is in demand"}></ColorButton></h3>
            </div>
            <div className="md:w-[50%] w-auto">
            <p className="text-black font-medium mb-5 mt-4 xl:text-[16px] text-[14px]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            <ActionButton  active={true} linkto={"/"}> 
              Learn More
            </ActionButton>
            </div>
          </div>
          </div>

          {/*third subsection */}
          <TimeLineSection></TimeLineSection>
          <LearningLanguage></LearningLanguage>
        </div>
      </section>

      {/* section3 */}
      <section className="w-[100%] bg-black">
        <div className="w-[85%] m-auto  flex md:flex-row flex-col" >
          <InstructorSection></InstructorSection>
        </div>
      </section>

      {/* section4 */}
      <section className="w-[100%] bg-black">
        <RatingSlider></RatingSlider>
      </section>

      {/* footer */}
      <Footer></Footer>
    </div>
  );
}

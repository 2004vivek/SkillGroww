import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordResetPage from "./pages/PasswordResetPage";
import ConfirmationEmail from "./pages/ConfirmationEmail";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./components/About/About";
import ContactPage from "./components/Contacts/ContactPage";
import NotFound from "./pages/NotFound";
import Home from "./components/Home/Home";
import Dashboard from "./pages/Dashboard";
import Myprofile from "./components/Profile/Myprofile";
import EnrolledCourse from "./components/Profile/EnrolledCourse";
import Settings from "./components/Settings/Settings";
import ProtectedRoute from "./pages/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import MyCourse from "./components/Instructor/MyCourse/MyCourse";
import AddCourse from "./components/Instructor/AddCourse.jsx/AddCourse";
import EditCourse from "./components/Instructor/EditCourse/EditCourse";
import Category from "./components/Category/Category";
import CourseDetails from "./components/Coursedetails/CourseDetails";
import ViewCourse from "./components/ViewCourse/ViewCourse";
import VideoElement from "./components/ViewCourse/VideoElement";

function App() {
  const usertype = JSON.parse(localStorage.getItem("usertype"));
  const role = usertype?.role;
  return (
    <>
      <div className="bg-black min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route path="/confirm-email" element={<ConfirmationEmail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/update-password/:id" element={<UpdatePassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/category/:id" element={<Category/>}/>
          <Route path="/course/:id" element={<CourseDetails/>}/>
          <Route
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<Myprofile />} />
            <Route path="/dashboard/setting" element={<Settings />} />

            <Route path="/dashboard/enrolled-course/:id" element={<EnrolledCourse />}/>
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/courses" element={<MyCourse />} />
            <Route path="/dashboard/add-courses" element={<AddCourse/>}/>
            <Route path="/dashboard/editcourse/:courseid" element={<EditCourse/>}/>
          </Route>

          {/* <Route 
          element={
            <ProtectedRoute>
              <ViewCourse/>
            </ProtectedRoute>
          }
          > */}
            <Route path="/viewcourse/:id/" element={<ViewCourse/>}/>
            {/* <Route path="/"/> */}


          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

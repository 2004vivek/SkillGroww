import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {AppContextProvider} from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import {CourseContextProvider}  from "./context/CourseContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
      <ToastContainer />
    </AppContextProvider>
  </BrowserRouter>
);

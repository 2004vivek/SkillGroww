import { ImProfile } from "react-icons/im";
import { FaCartArrowDown } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
const sidebardata=[
    {
        "name":"My Profile",
        "route":"/dashboard/my-profile",
        "icons":<ImProfile/>

    },
    {
        "name":"Dashboard",
        "route":"/dashboard/instructor",
        "path":"Instructor",
        "icons":<MdDashboard />

    },
    {
        "name":"My Courses",
        "route":"/dashboard/courses",
        "path":"Instructor",
        "icons":<FaBookReader />

    },

    {
        "name":"Add Courses",
        "route":"/dashboard/add-courses",
        "path":"Instructor",
        "icons":<MdAssignmentAdd />

    },
    {
        "name":"Enrolled Courses",
        "route":(id)=>`/dashboard/enrolled-course/${id}`,
        "path":"Student",
        "icons":<FaBookReader />
    },
    {
        "name":"Cart",
        "route":"/dashboard/cart",
        "path":"Student",
        "icons":<FaCartArrowDown />
    },
    // {
    //     "name":"Logout",
    //     "route":"/logout",
    //     "icons":"a"

    // }

]
export default sidebardata;
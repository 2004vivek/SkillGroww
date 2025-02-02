import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const Appcontext = createContext();
export function AppContextProvider({ children }) {

  const [subcategory,setsubcategory]=useState([]);

  //checking if the token is present or not
  const [token,settoken]=useState(null);
  const tokenid= localStorage.getItem("token"); 
  useEffect(() => {
 
   if(tokenid){
    settoken((localStorage.getItem("token")));
   }
  },[tokenid])
  
  const [isloggedin, setloggedin] = useState(false);
  const [loading,setloading]=useState(false)
  const [email,setemail]=useState("")
  console.log("this is email entered by user",email)

  

  const [profileinfo, setprofileinfo] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : {};
});
  


  function logoutHandler(navigate) {
    localStorage.removeItem("token");
    localStorage.removeItem("imageurl");
    localStorage.removeItem("usertype");
   
    settoken(null);
    navigate("/login");
    setImageUrl(null);
    setshowmodal(false);
  
   
  }

  const [showpassword,setshowpassword] = useState(false);
  const [showpassword1,setshowpassword1]=useState(false)
  function SymbolHandler() {
    setshowpassword(!showpassword);
  }
  function ConfirmSymbolHandler(){
    setshowpassword1(!showpassword1)
  }

  const [accounttype, setaccounttype] = useState("Student");
  console.log(accounttype)
  
  //signup form handler
  const [signupinputfield,setsignupinputfield]=useState({
    firstName:"",
    lastName:"",
    email:"",
    Phone:"",
    password:"",
    confirmpassword:"",
    role:accounttype,
    otp:""
  })
console.log(signupinputfield)
  useEffect(() => {
    setsignupinputfield((prev)=>({
        ...prev, role:accounttype,
    }))
    
  }, [accounttype])
  
   const signuponChangeHandler=(e)=>{
    const {name,value}=e.target
    setsignupinputfield((prev)=>{
        return {
            ...prev,[name]:value
        }
    })

   }

   const EmailVerifysubmitHandler = async(e) => {
    e.preventDefault();
    try {
       
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signup`,signupinputfield);
        console.log(response.data);
        toast.success("Signup successful!");
        
    } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    // console.log("hi bhai log",error.response.data)
    console.log("dusra",error.response.data.message)
    toast.error(error.response.data?.message ||error.message);
    }
   
  };

  //login form handler
  const [logininputfield,setlogininputfield]=useState({
    email:"",
    password:""
})
console.log(logininputfield)

let [imageUrl,setImageUrl]=useState(localStorage.getItem("imageurl")??"")

//onsubmit login page 
  const loginFormHandler=async(e,navigate)=>{
    e.preventDefault()
    setloading(true)
    setloggedin(false)
    try {
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,logininputfield)
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
      }
      console.log("this is user data",response.data.user)
        console.log("this is login data",response.data.user.role);
        localStorage.setItem("usertype",JSON.stringify(response.data.user));
        localStorage.setItem("imageurl",response.data.user.image);
        setImageUrl(response.data.user.image);
        navigate("/dashboard/my-profile")
        // setImageUrl(response.data.user.image)

        //get the profile details
        const token=response.data.token;
        const profileid=response.data.user.additionalDetails
        const userprofiledetails=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/profile/get-user-details/${profileid}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )
        let detail=userprofiledetails.data.userdetails;
        localStorage.setItem("profile",JSON.stringify(detail));
        setprofileinfo(detail)

        setloggedin(true);
    
        toast.success("Loggedin Successfully!");
        
    } catch (error) {
        console.log("error occured",error.response?.data||error.message)
        toast.error(error.response.data.message);
    }
    finally{
        setloading(false);
       
    }
  }
  const onchangeLoginHandler=(e)=>{
    const {value,name}=e.target
    setlogininputfield((prev)=>{
        return{
            ...prev,[name]:value
        }
    })
  }

  //update the password
  const [updatefield,setupdatefield]=useState({
    password:"",
    confirmpassword:"",
    token:""

  })
  const onchangeupdateHandler=(e)=>{
    const {value,name}=e.target
    setupdatefield((prev)=>{
      return {
        ...prev,[name]:value
      }
    })

  }
// console.log(updatefield)

//modal 
const [showmodal,setshowmodal]=useState(false)
 

  const value = {
    isloggedin,
    logoutHandler,
    SymbolHandler,
    showpassword,
    accounttype,
    setaccounttype,
    EmailVerifysubmitHandler,
    signupinputfield,
    signuponChangeHandler,
    loading,
    setloading,
    showpassword1,
    ConfirmSymbolHandler,
    email,setemail,setsignupinputfield,loginFormHandler,onchangeLoginHandler,
    onchangeupdateHandler,
    updatefield,
    setupdatefield,
    token,settoken,
    showmodal,setshowmodal,
    imageUrl,setImageUrl,
    profileinfo,setprofileinfo,
   subcategory,setsubcategory
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
}

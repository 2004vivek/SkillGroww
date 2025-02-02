const express=require("express")
const app=express()

const cookieparser=require('cookie-parser')
const fileupload=require("express-fileupload")
const cors=require('cors')




//using of middleware to resist this route from parsing
app.use((req, res, next) => {
    if (req.path === '/api/v1/payment/webhooks') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

app.options("*", cors());

//   app.use(express.json())
app.use(cookieparser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const userroute=require('./Routes/User')
const profileroute=require('./Routes/Profile')
const paymentroute=require('./Routes/Payments')
const courseroute=require('./Routes/Course')
const cartroute=require('./Routes/Cart')
const courseprogress=require('./Routes/CourseProgress')


app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

const {connecttocloudinary}=require('./config/cloudinary')
connecttocloudinary() 
require("dotenv").config()
const dbconnect=require("./config/database")
dbconnect()

app.use("/api/v1/user",userroute)
app.use("/api/v1/profile",profileroute)
app.use("/api/v1/course",courseroute)
app.use("/api/v1/payment",paymentroute)
app.use("/api/v1/cart",cartroute)
app.use("/api/v1/courseprogress",courseprogress)
app.get("/",(req,res)=>{
    res.send("Your server is working properly")
})

const port=process.env.PORT||4000
app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})
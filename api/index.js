const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const connectDB = require("./config/db");
const userRoute=require("./routes/users")
const authRoute=require('./routes/auth')
const postRoute=require('./routes/posts')
const multer  = require('multer')
const path = require("path");

dotenv.config();
connectDB(); ///mongoose connection 

app.use("/images", express.static(path.join(__dirname, "public/images")));

///middlewares
app.use(express.json());
app.use(helmet())
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single('file'), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
// app.use("/api/profile/posts",postRoute);
// app.use("/api/profile/users",userRoute);



app.listen(8080,()=>{
    console.log("backend server is running ");
})
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routers/user.router.js";
import imageRouter from "./routers/image.router.js";

dotenv.config()

const port = process.env.PORT

const app =express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use("/users",userRouter)
app.use("/login",userRouter)
app.use("/image",imageRouter)
app.get("/",(req,res)=>{
    res.send("hello gaga")
})

app.listen(port,()=>console.log(`server running on ${port}`))

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>console.log("connection to data base"))
.catch((error)=>console.log(error.message));






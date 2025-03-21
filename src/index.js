import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routers/user.router.js";
import imageRouter from "./routers/image.router.js";
import multer from "multer";
import path from "path";

dotenv.config()

const port = process.env.PORT

const app =express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use("/users",userRouter)
app.use("/login",userRouter)
app.use("/image",imageRouter)

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,'uploads');
    },
    filename: (req,file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const apload = multer({storage: storage})
app.post("/apload", apload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.status(200).send({
        message: 'File uploaded successfully!',
        file: req.file,
    });
});

app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>console.log("connection to data base"))
.catch((error)=>console.log(error.message));
app.listen(port,()=>console.log(`server running on ${port}`))







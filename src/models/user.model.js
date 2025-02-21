import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"

    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);

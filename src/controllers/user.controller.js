import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        const hash = bcrypt.hashSync(password,10)
        const user = await User.create({name,email,password:hash})
        res.status(201).json({message:"user created succefully."})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export {createUser}
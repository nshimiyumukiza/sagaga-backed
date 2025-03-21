import jwt from "jsonwebtoken";
const verifyAccess = (passRole) =>{
    return (req,res,next) =>{
        const token = req.headers["auth"];
        if(!token){
            return res.status(403).json({message:"token not found"})
        }else{
            try {
                const verifyToken = jwt.verify(token,process.env.SCRETKEY,{expiresIn:"1d"})
                req.user = verifyToken.user
                if(passRole !== verifyToken.user.role){
                    return res.status(401).json({message:"you are not allowed."})
                }
            } catch (error) {
                if(error.name ="jsonwebtoken"){
                    res.status(500).json({error:error.message})
                }
                
            }
        }

    }

}
export default verifyAccess;
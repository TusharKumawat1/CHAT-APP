import jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/User.js";
dotenv.config();
export const middleware=async(req,res,next)=>{
    if (req.headers.authorization ) {
       try {
        let token = req.headers.authorization
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findOne({_id:decodedToken.id}).select("-password");
        
        next();
       } catch (error) {
        console.log(error)
        res.status(400).send(error)
       }
    }else{
        res.status(401).send("Unathorized")
    }
}

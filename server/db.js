import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToMongo=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongo successfully")
    } catch (error) {
        console.log("connection faild : ",error)
    }
}
export default connectToMongo;
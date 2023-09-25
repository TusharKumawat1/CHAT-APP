import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        require:true,
      },
    email:{
        type:String,
        unique:true,
        require:true,
      },
      password:{
        type:String,
        require:true,
      },
      latestMessage:{
        type:Object,
        default:{latestMsg:"No messeges yet"}
      },
      pfp:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      }
    },
    {timestamps:true}
);
export default mongoose.model.User || mongoose.model("User",userSchema);
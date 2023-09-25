import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
    isGroupChat:{
        type:Boolean,
        default:false,
      },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }],
      groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      messages:{
        type:Array
      }
    },
    {timestamps:true}
);
export default mongoose.model.Chat || mongoose.model("Chat",chatSchema);
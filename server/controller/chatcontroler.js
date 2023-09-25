import Chat from "../models/Chat.js";
import User from "../models/User.js";

// export const createChat = async (req, res) => {
//   try {
//     if (!req.user) {
//       res.status(400).send("Unauthorized");
//     }
//     const { reciver } = req.body;
//     const sender = req.user._id;
  
//    const chat=await Chat.findOne({users:{$all:[sender,reciver]}})

//       if (chat) {    
//         return res.status(200).json({response:"chat already exist"});
//       }
        

//   } catch (error) {
//     console.log(error)
//     return res.status(400).send(error);
//   }
// };
export const addMessage=async(req,res)=>{
  try {
    if (!req.user) {
      res.status(400).send("Unauthorized");
    }
    const { reciver ,data} = req.body;
    const sender = req.user._id;
    const chat=await Chat.findOne({users:{$all:[sender,reciver]}})
    if (!chat) {    
      return res.status(400).json({response:"chat not exist"});
    }
    const newMessage={
      sender:sender,
      textMessage:data,
      timeStamp: new Date()
    }
    await chat.messages.push(newMessage)
    await chat.save();
    await User.updateOne(
      { _id: sender}, // updatin sender latestmsg
      { $set: { [`latestMessage.latestMsg`]: data,[`latestMessage.timeStamp`]:   new Date(Date.now()).getHours() +
      ":" +new Date(Date.now()).getMinutes()} }
    );
    await User.updateOne(
      { _id: reciver}, // updatin recivers latestmsg
      { $set: { [`latestMessage.latestMsg`]: data,[`latestMessage.timeStamp`]:   new Date(Date.now()).getHours() +
      ":" +new Date(Date.now()).getMinutes(),} }
    );
    return res.status(200).json({response:chat.messages});
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
}
export const getCurrentChat=async(req,res)=>{
    try {
      if (!req.user) {
        res.status(400).send("Unauthorized");
      }
      const { reciver ,data} = req.body;
      const sender = req.user._id;
      const chat=await Chat.findOne({users:{$all:[sender,reciver]}})
      if (chat) {    
        return res.status(200).json(chat);
      }else{
        const newChat = await Chat({ users: [sender, reciver] });
        await newChat.save();
        return res.status(200).json(newChat);
      }
    } catch (error) {
      console.log(error)
    }
}
export const getMessages=async(req,res)=>{
  try {
    if (!req.user) {
      res.status(400).send("Unauthorized");
    }
    const { reciver} = req.body;
    const sender = req.user._id;
    const chat=await Chat.findOne({users:{$all:[sender,reciver]}})
    const messages=await chat?.messages
    if (messages) {
      //sending response
      return res.status(200).json({status:true,messages});
    }else{
      return res.status(400).json({error:"no messeges yet"});
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
}
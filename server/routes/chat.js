import express from "express";
import { middleware } from "../middleware/AuthMiddleware.js";
import { addMessage, getCurrentChat, getMessages } from "../controller/chatcontroler.js";
const router = express.Router();
try {
    
    router.post("/addMessage",middleware,addMessage)
    router.post("/getCurrentChat",middleware,getCurrentChat)
    router.post("/getMessages",middleware,getMessages)

} catch (error) {
    console.log(error)
}
export default router;


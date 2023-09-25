import express from "express";
import { fetchUsers ,searchUser,fetchSingleUsers,fetchCurrentUsers} from "../controller/UserController.js";
import {middleware} from "../middleware/AuthMiddleware.js";
const router = express.Router();
try {

router.get("/searchUser" ,middleware,searchUser)
router.get("/fetchUsers" ,middleware,fetchUsers)
router.post("/fetchSingleUsers" ,middleware,fetchSingleUsers)
router.get("/fetchCurrentUsers" ,middleware,fetchCurrentUsers)
} catch (error) {
    console.log(error)
}
export default router;



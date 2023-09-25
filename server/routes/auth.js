import express from "express";
import { signUp,logIn } from "../controller/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login",logIn)

export default router;

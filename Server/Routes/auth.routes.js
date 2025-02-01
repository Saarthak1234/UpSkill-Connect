import { login, signup, verifyOTP } from "../Controller/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/verifyOTP", verifyOTP)

export default router
import express from "express";
import { createUser, getUser, login } from "../controllers/user.controller.js";
import verifyAccess from "../middlew/verify.js";

const router = express.Router();

router.post("/",createUser)
router.get("/",verifyAccess("user"),getUser)
router.post("/login",login)
export default router
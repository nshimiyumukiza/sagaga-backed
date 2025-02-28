import express from "express";
import { createImg, getImg } from "../controllers/image.controller.js";

const router = express.Router()
router.post("/",createImg);
router.get("/",getImg);

export default router;
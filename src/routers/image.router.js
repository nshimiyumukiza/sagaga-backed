import express from "express";
import { createImg,getImage } from "../controllers/image.controller.js";

const router = express.Router();
router.post("/",createImg);
router.get("/",getImage);


export default router;
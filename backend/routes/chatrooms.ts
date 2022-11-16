import express from "express";
const router = express.Router();

import { createChatroom, getAllRooms } from "../controllers/chatroom";

router.post("/", createChatroom);

router.get("/", getAllRooms);

export default router;

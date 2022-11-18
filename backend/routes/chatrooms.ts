import express from "express";
const router = express.Router();

import { createChatroom, getAllRooms } from "../controllers/chatroom";

router.post("/createChatRoom", createChatroom);

router.get("/getAllRooms", getAllRooms);

export default router;

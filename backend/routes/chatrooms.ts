import express from "express";
const router = express.Router();

import { getAllRooms, createRoom } from "../controllers/chatroom";

router.get("/", getAllRooms);

router.post("/createRoom", createRoom);

export default router;

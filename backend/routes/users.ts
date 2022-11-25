import express from "express";
const router = express.Router();
import { userCreate, getCurrentUser } from "../controllers/users";

router.post("/", userCreate);

router.get("/", getCurrentUser);

export default router;

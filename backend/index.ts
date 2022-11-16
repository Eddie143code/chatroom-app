import express from "express";
import cors from "cors";

import chatrooms from "./routes/chatrooms";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/chatrooms", chatrooms);

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const server = app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});

const io = server;

io.on("connection", (_socket) => {
  console.log(`socket running on port 3000`);
});

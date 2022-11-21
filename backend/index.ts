import express from "express";
import cors from "cors";
import router from "./routes/chatrooms";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const http = require("http");
const socketio = require("socket.io");

import { createChatroom, getAllRooms } from "./controllers/chatroom";

const server = http.createServer(app);
const PORT = 3001;

const io = socketio(server);

io.on("connection", (socket: any) => {
  console.log("io connected");

  socket.on("join", (roomName: any) => {
    console.log("in join");
    const room = roomName;
    const user = "admin";

    socket.join(room);
    io.to(room).emit(
      "message",
      { user: user, message: "you joined the room" },
      () => {}
    );
  });

  socket.on("createRoom", (roomName: any) => {
    const test = createChatroom(roomName);

    if (!test) {
      throw Error;
    }
    socket.emit("roomCreated", { roomName });
  });

  socket.on("getRooms", () => {
    console.log("in getrooms");
    const rooms = getAllRooms();

    socket.emit("fetchRooms", { rooms });
  });

  socket.on("sendMessage", ({ user, room, message }: any) => {
    socket.join(room);
    socket.emit("message", { user, message }, () => {});
  });
});

server.listen(PORT, () => console.log(`Server has started.`));

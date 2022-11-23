import express from "express";
import cors from "cors";
import router from "./routes/chatrooms";
import { userCreate, getCurrentUser } from "./controllers/users";
import { createChatroom, getAllRooms } from "./controllers/chatroom";
const http = require("http");
const socketio = require("socket.io");
const { connectToDatabase } = require("./util/db");

const app = express();

const server = http.createServer(app);
const PORT = 3001;

const io = socketio(server);

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

io.on("connection", (socket: any) => {
  console.log("io connected");

  socket.on("createUser", ({ name }: any) => {
    userCreate({ name });
  });

  socket.on("joinChat", ({ user }: any) => {
    console.log("in join");

    const User: any = getCurrentUser(user);

    socket.emit(
      "message",
      { user: User.name, message: "you joined the room" },
      () => {}
    );

    socket.broadcast
      .to(user.room)
      .emit("message", { User, message: `${User.name} joined the room` });
  });

  socket.on("sendMessage", ({ message }: any, callback: any) => {
    console.log("in sendmessage");

    const user: any = getCurrentUser(socket.id);

    socket.join(user.room);

    io.to(user.room).emit("message", { user: user.name, message });
    callback();
  });

  socket.on("createRoom", (roomName: any, callback: any) => {
    const test = createChatroom(roomName);

    if (!test) {
      throw Error;
    }
    socket.emit("roomCreated", { roomName });

    callback();
  });

  socket.on("getRooms", (callback: any) => {
    const rooms = getAllRooms();

    socket.emit("fetchRooms", { rooms });

    callback();
  });
});

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

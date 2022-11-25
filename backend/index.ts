import express from "express";
import cors from "cors";
import routerChatrooms from "./routes/chatrooms";
import routerUsers from "./routes/users";
import http from "http";
const socketio = require("socket.io");
import { connectToDatabase } from "./util/db";

const app = express();

const server = http.createServer(app);
const PORT = 3001;

const io = socketio(server);

app.use(express.json());
app.use(cors());

app.use("/api/chatrooms", routerChatrooms);
app.use("/api/users", routerUsers);

io.on("connection", (socket: any) => {
  console.log("io connected");
  socket.on("joinChat", ({ user, room }: any, callback: any) => {
    console.log("in join");
    socket.join(room);

    socket.emit("message", { user: user, message: "you joined the room" });

    socket.broadcast
      .to(room)
      .emit("message", { user: user, message: `${user}, has joined the room` });

    io.to(room).emit("roomData", { user: user });
    callback();
  });

  socket.on(
    "sendMessage",
    ({ user, message, room, socket }: any, callback: any) => {
      console.log(`in sendmessage: ${user}, ${message}, ${room}, ${socket} `);

      io.in(socket).socketsJoin(room);

      io.to(room).emit("message", { user: user, message: message });
      callback();
    }
  );
});

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

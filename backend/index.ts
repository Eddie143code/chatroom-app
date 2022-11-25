import express from "express";
import cors from "cors";
import routerChatrooms from "./routes/chatrooms";
import routerUsers from "./routes/users";
const http = require("http");
const socketio = require("socket.io");
const { connectToDatabase } = require("./util/db");

const app = express();

const server = http.createServer(app);
const PORT = 3001;

const io = socketio(server);

app.use(express.json());
app.use(cors());

app.use("/api/chatrooms", routerChatrooms);
app.use("/api/users", routerUsers);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

io.on("connection", (socket: any) => {
  console.log("io connected");

  /* socket.on("createUser", ({ name }: any) => {
    const User: any = userCreate({ name });
    console.log(typeof User);

    socket.emit("createdUser", { User });
  }); */

  socket.on("joinChat", ({ user, room }: any) => {
    console.log("in join");

    socket.emit(
      "message",
      { user: user, message: "you joined the room" },
      () => {}
    );

    socket.broadcast
      .to(room)
      .emit("message", { user: user, message: `${user}, has joined the room` });

    // io.to(room).emit("roomData", { user: user, message: "rooms of users" });

    /* socket.broadcast
      .to(user.room)
      .emit("message", { User, message: `${User.name} joined the room` });
      */
  });

  socket.on("sendMessage", ({ user, message, room }: any) => {
    console.log(`in sendmessage: ${user}, ${message}, ${room} `);
    socket.join(room);
    //const User: any = getCurrentUser({ user });

    //const username = User.findOne({ where: { name: user } });
    io.to(room).emit("message", { user: user, message: message });
  });
});

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

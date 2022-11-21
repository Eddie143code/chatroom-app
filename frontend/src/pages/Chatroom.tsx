import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Messages from "../components/Messages";
import { sendMsg } from "../features/chat/chatSlice";

const ENDPOINT = "http://localhost:3001";

let socket = io(ENDPOINT);

const Chatroom = () => {
  const [user, setUser] = useState<any>();

  const [room, setRoom] = useState<any>();
  const [sendMessage, setSendMessage] = useState<any>("");

  const { messages } = useSelector((state: any) => state.chat);

  const dispatch = useDispatch();

  const handleMessage = (e: any) => {
    e.preventDefault();
    socket.emit("sendMessage", { user, room, message: sendMessage }, () => {});
  };

  useEffect(() => {
    const userTemp = localStorage.getItem("user");
    setUser(userTemp);
    const joinRoom = localStorage.getItem("room");
    setRoom(joinRoom);

    socket.emit("join", { user: user, room: room }, () => {});

    socket.on("message", ({ user, message }) => {
      const msg = { user: user, message: message };
      dispatch(sendMsg(msg));
    });
  }, []);
  return (
    <main className="grid-main">
      <div className="chatroom-container">
        <div className="chatroom-container__heading">
          <button className="chatroom-container__heading__btn">
            <AiOutlineArrowLeft
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          </button>
          <button onClick={() => console.log(messages)}></button>

          <h1 className="chatroom-container__heading__head">[Chatroom name]</h1>
        </div>

        {messages &&
          messages.map((message: any) => {
            console.log(message);
            return <Messages key={message.message} messages={message} />;
          })}
      </div>
      <div className="msg-input-container">
        <form onSubmit={handleMessage} className="msg-input-container">
          <input
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            className="msg-input-container__msg-input"
          />
        </form>
      </div>
    </main>
  );
};

export default Chatroom;

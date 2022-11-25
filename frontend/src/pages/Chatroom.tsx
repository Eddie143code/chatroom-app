import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Messages from "../components/Messages";
import { sendMsg } from "../features/chat/chatSlice";

const ENDPOINT = "http://localhost:3001";

let socket: any;

socket = io(ENDPOINT);

const Chatroom = () => {
  const [sendMessage, setSendMessage] = useState<any>("");
  const [roomData, setRoomData] = useState<any>("");

  const { messages } = useSelector((state: any) => state.chat);

  const dispatch = useDispatch();

  const handleMessage = (e: any) => {
    e.preventDefault();

    socket.emit(
      "sendMessage",
      {
        user: JSON.stringify(localStorage.getItem("user")),
        message: sendMessage,
        room: JSON.stringify(localStorage.getItem("socket")),
      },
      () => {}
    );
  };

  useEffect(() => {
    socket.emit(
      "joinChat",
      {
        user: JSON.stringify(localStorage.getItem("user")),
        room: localStorage.getItem("socket"),
      },
      () => {}
    );
    socket.on("message", ({ user, message }: any) => {
      console.log(user);

      const msg = { user, message };
      dispatch(sendMsg(msg));
    });
    socket.on("roomData", ({ user, message }: any) => {
      const msg = { user, message };
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

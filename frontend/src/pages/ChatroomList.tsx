import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppDispatch } from "../app/store";

import { createRoom, sendMsg, getRooms } from "../features/chat/chatSlice";

const ENDPOINT = "http://localhost:3001";

let socket = io(ENDPOINT);

const Chatrooms = () => {
  const [name, setName] = useState<string>();
  const [room, setRoom] = useState<any>();
  const [allRooms, setAllRooms] = useState<any>();

  const { chatrooms }: any = useSelector((state: any) => state.chat);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const roomSubmit = async (e: any) => {
    e.preventDefault();
    const roomTemp = e.target.temp.value;

    dispatch(createRoom({ room: roomTemp, socket: String(socket.id) }));
    setRoom(room);
  };

  const roomClick = async (e: any) => {
    const rooms = await axios.get("http://localhost:3001/api/chatrooms");
    const room = rooms.data.find((room: any) => {
      if ((room.name = e.target.name)) {
        return room.socket;
      }
    });

    localStorage.setItem("room", e.target.name);
    localStorage.setItem("socket", room.socket);

    navigate(`/chatroomlist/chatroom/${e.target.name}`);
  };

  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("user"));
    setName(user);
    dispatch(getRooms());
  }, [room]);

  return (
    <main className="grid-main">
      <article className="chatroomlist-container">
        <h1 className="chatroomlist-container__head-one">Join as:</h1>
        <h3 className="chatroomlist-container__head-three">{name}</h3>
        <form onSubmit={roomSubmit}>
          <input name="temp" />
          <input type="submit" />
        </form>
        {chatrooms &&
          chatrooms.map((chatroom: any) => {
            return (
              <button
                key={chatroom}
                name={chatroom}
                onClick={roomClick}
                className="chatroomlist-container__button chatroom-name"
              >
                {chatroom}
              </button>
            );
          })}
      </article>
    </main>
  );
};

export default Chatrooms;

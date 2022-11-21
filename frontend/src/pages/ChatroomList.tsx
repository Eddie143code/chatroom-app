import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import {
  create,
  createdRoom,
  getRoomsEmit,
  getRoomsOn,
} from "../features/chat/chatSlice";

const ENDPOINT = "http://localhost:3001";

let socket = io(ENDPOINT);

const Chatrooms = () => {
  const [name, setName] = useState<string>();
  const [room, setRoom] = useState<any>();

  const { chatrooms }: any = useSelector((state: any) => state.chat);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomSubmit = async (e: any) => {
    e.preventDefault();
    const roomTemp = e.target.temp.value;

    await dispatch(create(roomTemp));
    setRoom(roomTemp);

    // await dispatch(createdRoom());
  };

  const roomClick = (e: any) => {
    console.log(e.target.name);
    localStorage.setItem("room", e.target.name);

    navigate(`/chatroomlist/chatroom/${e.target.name}`);
  };

  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("user"));
    setName(user);
    socket.emit("getRooms", () => {});
    socket.on("fetchRooms", ({ rooms }: any) => {
      dispatch(getRoomsOn(rooms));
    });
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

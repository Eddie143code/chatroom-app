import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

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

  const roomSubmit = async (e: any) => {
    e.preventDefault();
    const roomTemp = e.target.temp.value;

    await dispatch(create(roomTemp));
    setRoom(roomTemp);
    // await dispatch(createdRoom());
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
      <button onClick={() => console.log(chatrooms)}></button>
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
              <button className="chatroomlist-container__button chatroom-name">
                {chatroom}
              </button>
            );
          })}
      </article>
    </main>
  );
};

export default Chatrooms;

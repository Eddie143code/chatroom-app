import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getRooms } from "../features/chat/chatSlice";

const ENDPOINT = "http://localhost:3001/api/users";

const Join = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const submitName = async (e: any) => {
    e.preventDefault();
    const temp: any = await axios.post(ENDPOINT, { name: name });
    localStorage.setItem("user", temp.data.name);
    navigate("/chatroomlist");
  };

  return (
    <main className="grid-main">
      <article className="join-container">
        <form onSubmit={submitName} className="join-container__wrapper">
          <h1 className="join-container__wrapper__head">Join as:</h1>
          <input
            value={name}
            className="join-container__wrapper__input"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </article>
    </main>
  );
};

export default Join;

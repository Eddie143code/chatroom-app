import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
let socket = io(ENDPOINT);

const Join = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const submitName = (e: any) => {
    console.log(name);
    e.preventDefault();
    localStorage.setItem("user", name);
    socket.emit("createUser", { name });

    navigate("/chatroomlist");
  };

  return (
    <main className="grid-main">
      <article className="join-container">
        <form onSubmit={submitName} className="join-container__wrapper">
          <h1 className="join-container__wrapper__head">Join as:</h1>
          <input
            className="join-container__wrapper__input"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </article>
    </main>
  );
};

export default Join;

import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Chatroom = () => {
  return (
    <main className="grid-main">
      <div className="chatroom-container">
        <div className="chatroom-container__heading">
          <button className="chatroom-container__heading__btn">
            <AiOutlineArrowLeft
              style={{ height: "100%", width: "100%", border: "none" }}
            />
          </button>

          <h1 className="chatroom-container__heading__head">[Chatroom name]</h1>
        </div>

        <div className="chatroom-container__msg-container-receive">
          <h3 className="chatroom-container__msg-container-receive__msg-name-receive">
            [username]
          </h3>
          <p className="chatroom-container__msg-container-receive__msg-receive">
            Lorem ipsum Dolor
          </p>
        </div>
        <div className="chatroom-container__msg-container-send">
          <h3 className="chatroom-container__msg-container-send__msg-name-send">
            [username]
          </h3>
          <p className="chatroom-container__msg-container-send__msg-send">
            Lorem ipsum Dolor
          </p>
        </div>
      </div>
      <div className="msg-input-container">
        <input className="msg-input-container__msg-input" />
      </div>
    </main>
  );
};

export default Chatroom;

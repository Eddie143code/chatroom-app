import React from "react";

const Chatrooms = () => {
  return (
    <main className="grid-main">
      <article className="chatroomlist-container">
        <h1 className="chatroomlist-container__head-one">Join as:</h1>
        <h3 className="chatroomlist-container__head-three">name: " name "</h3>
        <button className="chatroomlist-container__button chatroom-name">
          click me
        </button>
        <button className="chatroomlist-container__button chatroom-name">
          click me
        </button>
        <button className="chatroomlist-container__button chatroom-name">
          click me
        </button>
        <button className="chatroomlist-container__button chatroom-name">
          click me
        </button>
      </article>
    </main>
  );
};

export default Chatrooms;

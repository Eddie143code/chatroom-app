import React, { useState, useEffect } from "react";

const Messages: any = ({ messages }: any) => {
  const [name, setName] = useState<any>();

  useEffect(() => {
    const nameTemp = JSON.stringify(localStorage.getItem("user"));
    setName(nameTemp);
  });

  if (messages.user === "admin") {
    return (
      <div className="chatroom-container__msg-container-receive">
        <h3 className="chatroom-container__msg-container-receive__msg-name-receive">
          {messages.user}
        </h3>
        <p className="chatroom-container__msg-container-receive__msg-receive">
          {messages.message}
        </p>
      </div>
    );
  } else if (name === messages.user) {
    return (
      <div className="chatroom-container__msg-container-send">
        <h3 className="chatroom-container__msg-container-send__msg-name-send">
          {messages.user}
        </h3>
        <p className="chatroom-container__msg-container-send__msg-send">
          {messages.message}
        </p>
      </div>
    );
  } else if (name !== messages.user) {
    return (
      <>
        <div className="chatroom-container__msg-container-receive">
          <h3 className="chatroom-container__msg-container-receive__msg-name-receive">
            {messages.user}
          </h3>
          <p className="chatroom-container__msg-container-receive__msg-receive">
            {messages.message}
          </p>
        </div>
      </>
    );
  } else {
    return;
  }
};

export default Messages;

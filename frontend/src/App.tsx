import React from "react";

import Join from "./pages/Join";
import ChatroomList from "./pages/ChatroomList";
import Chatroom from "./pages/Chatroom";

import { Route, Routes } from "react-router-dom";
const ENDPOINT = "http://localhost:3001";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Join />}></Route>
        <Route path="/chatroomlist" element={<ChatroomList />}></Route>
        <Route
          path="chatroomlist/chatroom/:name"
          element={<Chatroom />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;

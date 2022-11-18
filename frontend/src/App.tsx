import React from "react";

import Join from "./pages/Join";
import ChatroomList from "./pages/ChatroomList";
import Chatroom from "./pages/Chatroom";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Join />}></Route>
        <Route path="/chatroomlist" element={<ChatroomList />}></Route>
        <Route path="/chatroom" element={<Chatroom />}></Route>
      </Routes>
    </>
  );
}

export default App;

import { chatroom } from "../data/chatrooms";

const data: any = [];

const createChatroom = (roomName: any) => {
  const name = roomName;
  const nameTest: chatroom = name;
  const test: any = data.find((n: any) => n === nameTest);

  if (test) {
    console.log("room exists");
    throw Error;
  }

  data.push(name);

  return data;
};

const getAllRooms = () => {
  const chatrooms = data;
  return chatrooms;
};

export { createChatroom, getAllRooms };

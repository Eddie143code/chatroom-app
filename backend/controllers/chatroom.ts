import chatroomsData from "../data/chatrooms";
import { chatroom } from "../data/chatrooms";

const createChatroom = async (req: any, res: any) => {
  const { name } = req.body;

  const nameTest: chatroom = name;
  const test: chatroom = chatroomsData.find((n) => n === nameTest);

  if (!test) {
    console.log("room exists");
    throw Error;
  }

  await chatroomsData.push(test);

  res.send(test);
};

const getAllRooms = async (_req: any, res: any) => {
  const chatrooms = await chatroomsData;
  res.json(chatrooms);
};

export { createChatroom, getAllRooms };

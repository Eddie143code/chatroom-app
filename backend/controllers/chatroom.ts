import { Chatroom } from "../models/chatroom";

const createRoom = async (req: any, res: any) => {
  const { name, socket } = req.body;

  const roomTest = await Chatroom.findOne({
    where: { name: name, socket: socket },
  });

  if (roomTest) {
    return res.json(roomTest);
  }

  const room = Chatroom.create({ name: name, socket: socket });

  return res.json(room);
};

const getAllRooms = async (_req: any, res: any) => {
  console.log("in getallrooms");
  const chatrooms = await Chatroom.findAll();

  return res.json(chatrooms);
};

export { getAllRooms, createRoom };

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

interface roomType {
  room: string;
}

interface chatState {
  chatrooms: string[];
}

let initialState: any = {
  chatrooms: [],
};

const ENDPOINT = "http://localhost:3001";

let socket = io(ENDPOINT);

const joinRoom = (room: roomType) => {
  socket.emit("join", { room }, (error: any) => {
    if (error) {
      console.log(error);
    }
  });
};

/*const createRoom = (roomName: roomType) => {
 
  });
}; 

const roomCreated = () => {};

*/

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    join: (state, payload: any) => {
      const { room } = payload;
      joinRoom(room);
    },
    getRoomsEmit: (state) => {
      return state;
    },
    getRoomsOn: (state, payload) => {
      let room: any = payload.payload;
      console.log(room);
      state.chatrooms = [...room];

      return state;
    },

    create: (state, payload: any) => {
      const roomName = payload.payload;

      socket.emit("createRoom", roomName, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
    },
    createdRoom: (state: any) => {
      let room;
      socket.on("roomCreated", ({ roomName }: any) => {
        room = roomName;
      });

      state.chatrooms.push({ room });
    },
  },
});

export const { getRoomsEmit, create, createdRoom, getRoomsOn } =
  chatSlice.actions;

export default chatSlice.reducer;

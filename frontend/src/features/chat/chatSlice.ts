import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

interface roomType {
  room: string;
}

interface chatState {
  chatrooms: string[];
}

const initialState: any = {
  chatrooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  messages: [],
};

const ENDPOINT = "http://localhost:3001/api/chatrooms";

export const getRooms = createAsyncThunk("/get", async () => {
  console.log("in roomsGet");
  const rooms = await axios.get(`${ENDPOINT}`);

  return rooms.data;
});

export const roomsCreate = createAsyncThunk(
  "/create",
  async ({ room, socket }: any) => {
    console.log(room, socket);

    const rooms = await axios.post(`${ENDPOINT}/createRoom`, {
      name: room,
      socket: socket,
    });

    return rooms.data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    //createRoom: (state, action) => {
    //},
    sendMsg: (state, action) => {
      const message = action.payload;

      state.messages.push(message);

      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        const allRooms = action.payload.map((room: any) => {
          return room.name;
        });
        state.chatrooms = allRooms;
      })
      .addCase(getRooms.rejected, (state: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(roomsCreate.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(roomsCreate.fulfilled, (state: any) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(roomsCreate.rejected, (state: any) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { sendMsg } = chatSlice.actions;

export default chatSlice.reducer;

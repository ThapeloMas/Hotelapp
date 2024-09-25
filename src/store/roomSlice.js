// store/roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: [], // Initial state is an empty array
  reducers: {
    addRoom: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addRoom } = roomSlice.actions;
export default roomSlice.reducer;

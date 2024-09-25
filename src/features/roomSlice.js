import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: [], // The initial state is an empty array for storing rooms
  reducers: {
    addRoom: (state, action) => {
      state.push(action.payload); // Push the new room into the state
    },
  },
});

export const { addRoom } = roomSlice.actions;
export default roomSlice.reducer;

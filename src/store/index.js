import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./roomSlice"; // Import the room reducer

export const store = configureStore({
  reducer: {
    rooms: roomReducer, // Add roomReducer to the store
  },
});

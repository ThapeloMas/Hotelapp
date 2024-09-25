import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import roomReducer from "./features/roomSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    room: roomReducer,
  },
});



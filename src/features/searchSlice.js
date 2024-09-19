import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  checkInDate: null,
  checkOutDate: null,
  guests: "2 adults · 0 children · 1 room",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCheckInDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
  },
});

export const { setLocation, setCheckInDate, setCheckOutDate, setGuests } =
  searchSlice.actions;

export default searchSlice.reducer;

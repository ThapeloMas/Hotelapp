import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setLocation,
  setCheckInDate,
  setCheckOutDate,
  setGuests,
} from "../features/searchSlice";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { location, checkInDate, checkOutDate, guests } = useSelector(
    (state) => state.search
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => dispatch(setLocation(e.target.value))}
        className="location-input"
      />
      <DatePicker
        selected={checkInDate}
        onChange={(date) => dispatch(setCheckInDate(date))}
        placeholderText="Check-in date"
        className="date-picker"
      />
      <DatePicker
        selected={checkOutDate}
        onChange={(date) => dispatch(setCheckOutDate(date))}
        placeholderText="Check-out date"
        className="date-picker"
      />
      <input
        type="text"
        placeholder="2 adults · 0 children · 1 room"
        value={guests}
        onChange={(e) => dispatch(setGuests(e.target.value))}
        className="guest-room-input"
      />
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;

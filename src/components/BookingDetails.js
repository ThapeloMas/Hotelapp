import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingDetails.css";
import { useNavigate } from "react-router-dom"; 
import gpic3 from "../images/2H.jpg";

function BookingDetails() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate(); 
 
  const handleBooking = () => {
   
    navigate("/payment");
  };

  return (
    <div className="booking-details">
      <h1>CHECK OUT ROOM</h1>
      <div className="booking-container">
        <img
          src={gpic3} 
          alt="Room"
          className="room-image"
        />
        <div className="booking-info">
          <h2>Price</h2>
          <div className="price-tag">
            <span className="tag">Tag</span>
            <span className="price">R 500</span>
          </div>
          <div className="check-in-out">
            <label>Check in</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
              className="date-picker"
            />
            <label>Check out</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
              className="date-picker"
            />
          </div>
          <button className="book-now" onClick={handleBooking}>
            Book Now
          </button>
          <div className="guest-details">
            <h3>Title</h3>
            <p>Please specify how many guests are coming</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;


import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingDetails.css";
import { useNavigate, useLocation } from "react-router-dom";

function BookingDetails() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { room } = location.state || {};

  const handleBooking = () => {
    // Calculate number of days between check-in and check-out
    const numDays = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    // Navigate to Payment page and pass necessary data
    navigate("/payment", {
      state: {
        roomNumber: room.roomNumber,
        price: room.price,
        numDays,
      },
    });
  };

  return (
    <div className="booking-details">
      <h1>Check Out Room</h1>
      <div className="booking-container">
        <div className="booking-info">
          {room && (
            <div className="room-summary">
              <h2>Room {room.roomNumber}</h2>
              <p>Location: {room.location}</p>
              <p className="room-price">Price: ${room.price}</p>
              <div className="room-photos">
                {room.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Room ${room.roomNumber}`}
                    className="room-image"
                  />
                ))}
              </div>
            </div>
          )}
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
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;

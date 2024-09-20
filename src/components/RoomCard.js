import React from "react";
import "./RoomCard.css";
import gpic3 from "../images/2H.jpg";

const RoomCard = () => {
  return (
    <div className="room-card">
      <img src={gpic3} alt="Room 1" className="room-image" />
      <h3 className="room-price">R150 per night</h3>
      <button className="book-now-btn">Book Now</button>
    </div>
  );
};

export default RoomCard;

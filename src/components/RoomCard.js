import React from "react";
import "./RoomCard.css";
import gpic3 from "../images/2H.jpg";

const RoomCard = () => {
  return (
    <div className="room-card">
      <img src={gpic3} alt="Room 1" />
      <button className="book-now-btn">Book Now</button>
    </div>
  );
};

export default RoomCard;

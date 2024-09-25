

// components/RoomCardsPage.js
import React from "react";
import { useSelector } from "react-redux";

function RoomCardsPage() {
  const rooms = useSelector((state) => state.rooms);

  // Check if `rooms` is defined and has items
  if (!rooms || rooms.length === 0) {
    return <p>No rooms available. Please add rooms from the admin dashboard.</p>;
  }

  return (
    <div>
      <h2>Available Hotels</h2>
      <div className="room-cards-container">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>Room {room.roomNumber}</h3>
            <p>Location: {room.location}</p>
            <p>Price: ${room.price}</p>
            <div className="room-photos">
              {room.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Room ${room.roomNumber}`} width="100%" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomCardsPage;
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore instance
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./RoomCardsPage.css"; // Import your CSS file
import SearchBar from "./SearchBar";

function RoomCardsPage() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomList);
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    navigate("/bookingdetails", { state: { room } }); // Pass room data using navigate
  };

  if (rooms.length === 0) {
    return (
      <p>No rooms available. Please add rooms from the admin dashboard.</p>
    );
  }

  return (
    <div>
    <SearchBar></SearchBar>
      <h2>Available Hotels</h2>
      <div className="room-section">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>Room {room.roomNumber}</h3>
            <p>Location: {room.location}</p>
            <p className="room-price">Price: R{room.price}</p>

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
            <button
              className="book-now-btn"
              onClick={() => handleBookNow(room)} // Pass room object to handleBookNow
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomCardsPage;

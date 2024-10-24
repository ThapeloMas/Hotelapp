
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Include auth for current user
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./RoomCardsPage.css";
import { MdFavorite } from "react-icons/md";

function RoomCardsPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomList);
      setFilteredRooms(roomList);
    };

    fetchRooms();
  }, []);

  const handleSearch = ({ location }) => {
    const filtered = rooms.filter((room) =>
      room.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleBookNow = (room) => {
    navigate("/bookingdetails/${room.id}", { state: { room } });
  };

  const handleAddToFavorites = async (room) => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(room.id), // Add room ID to favorites
      });
      alert("Room added to favorites!");
    } else {
      alert("You need to be logged in to add favorites.");
    }
  };

  if (filteredRooms.length === 0) {
    return (
      <p>No rooms available. Please add rooms from the admin dashboard.</p>
    );
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h2>Available Hotels</h2>
      <div className="room-section">
        {filteredRooms.map((room) => (
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
              onClick={() => handleBookNow(room)}
            >
              Book Now
            </button>
            <button
              className="book-now-btn"
             
              onClick={() => handleAddToFavorites(room)}
            >
              <MdFavorite color="red" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomCardsPage;

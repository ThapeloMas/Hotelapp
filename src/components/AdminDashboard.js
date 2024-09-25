// components/AdminDashboard.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../store/roomSlice";

function AdminDashboard() {
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  const handleAddRoom = () => {
    if (roomNumber && price && location && photos.length > 0) {
      const newRoom = {
        id: Date.now(),
        roomNumber,
        price,
        location,
        photos,
      };
      dispatch(addRoom(newRoom)); // Dispatching the room to the Redux store
      setRoomNumber("");
      setPrice("");
      setLocation("");
      setPhotos([]);
    } else {
      alert("Please fill all fields and upload a photo.");
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos([...photos, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Add New Room</h2>
      <div>
        <label>Room Number</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label>Photos</label>
        <input type="file" onChange={handlePhotoUpload} />
      </div>
      <button onClick={handleAddRoom}>Add Room</button>
    </div>
  );
}

export default AdminDashboard;

// components/AdminDashboard.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../store/roomSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore instance

function AdminDashboard() {
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  const handleAddRoom = async () => {
    if (roomNumber && price && location && photos.length > 0) {
      const newRoom = {
        roomNumber,
        price,
        location,
        photos, // Photos are already in Base64 format
      };

      try {
        // Save room data to Firestore
        const docRef = await addDoc(collection(db, "rooms"), newRoom);
        console.log("Room added with ID: ", docRef.id);

        // Dispatch the room to the Redux store
        dispatch(addRoom(newRoom));

        // Clear form fields
        setRoomNumber("");
        setPrice("");
        setLocation("");
        setPhotos([]);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please fill all fields and upload a photo.");
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos([...photos, reader.result]); // Base64 format
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

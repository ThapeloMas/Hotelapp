import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../store/roomSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore instance
import "./AdminDashboard.css"; // Make sure to import your CSS file

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

        // Show success alert
        alert("Room added successfully!");
      } catch (e) {
        console.error("Error adding document: ", e);

        // Show error alert
        alert("There was an error adding the room. Please try again.");
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
      <div className="room-section">
        <div className="room-card">
          <div className="room-photos">
            {photos.length > 0 && (
              <img src={photos[0]} alt="Room" className="room-image" />
            )}
          </div>
          <label>Room Number</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br></br>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br>
          
          </br>
          <label>Photos</label>
          <input type="file" onChange={handlePhotoUpload} />
          <button className="book-now-btn" onClick={handleAddRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../store/roomSlice";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editRoomId, setEditRoomId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const fetchedRooms = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(fetchedRooms);
      } catch (e) {
        alert("Error fetching rooms. Please try again.");
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    if (roomNumber && price && location && photos.length > 0) {
      const newRoom = {
        roomNumber,
        price,
        location,
        photos,
      };

      try {
        const docRef = await addDoc(collection(db, "rooms"), newRoom);
        dispatch(addRoom(newRoom));
        setRooms([...rooms, { ...newRoom, id: docRef.id }]);
        setRoomNumber("");
        setPrice("");
        setLocation("");
        setPhotos([]);
        alert("Room added successfully!");
      } catch (e) {
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
      setPhotos([...photos, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteDoc(doc(db, "rooms", roomId));
      setRooms(rooms.filter((room) => room.id !== roomId));
      alert("Room deleted successfully!");
    } catch {
      alert("There was an error deleting the room.");
    }
  };

  const handleEditRoom = (room) => {
    setEditRoomId(room.id);
    setRoomNumber(room.roomNumber);
    setPrice(room.price);
    setLocation(room.location);
    setPhotos(room.photos);
  };

  const handleUpdateRoom = async () => {
    const updatedRoom = {
      roomNumber,
      price,
      location,
      photos,
    };

    try {
      const roomDoc = doc(db, "rooms", editRoomId);
      await updateDoc(roomDoc, updatedRoom);
      setRooms(
        rooms.map((room) =>
          room.id === editRoomId ? { ...updatedRoom, id: editRoomId } : room
        )
      );
      alert("Room updated successfully!");
      setEditRoomId(null);
      setRoomNumber("");
      setPrice("");
      setLocation("");
      setPhotos([]);
    } catch {
      alert("There was an error updating the room.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="add-room-title">Add New Room</h2>
      <div className="add-room-card">
        <div className="add-room-form">
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="add-room-input"
          />
          <br></br>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="add-room-input"
          />
          <br></br>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="add-room-input"
          />
          <br></br>
          <label>Photos:</label>
          <input
            type="file"
            onChange={handlePhotoUpload}
            className="add-room-input"
          />
          {editRoomId ? (
            <button className="add-room-button" onClick={handleUpdateRoom}>
              Update Room
            </button>
          ) : (
            <button className="add-room-button" onClick={handleAddRoom}>
              Add Room
            </button>
          )}
        </div>
      </div>

      <h3 className="available-rooms-title">Available Rooms</h3>
      <div className="available-rooms">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <div className="room-photos">
              <img src={room.photos[0]} alt="Room" className="room-image" />
            </div>
            <p>Room Number: {room.roomNumber}</p>
            <p>Price: {room.price}</p>
            <p>Location: {room.location}</p>
            <button
              className="add-room-button"
              onClick={() => handleEditRoom(room)}
            >
              Edit
            </button>
            <button
              className="add-room-button"
              onClick={() => handleDeleteRoom(room.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

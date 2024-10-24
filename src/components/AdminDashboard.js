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
  const [bookedRooms, setBookedRooms] = useState([]);
  const dispatch = useDispatch();

  // Fetch available rooms
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

  // Fetch all user bookings (admin view)
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const allBookings = [];

        for (const userDoc of querySnapshot.docs) {
          const userData = userDoc.data();
          if (userData.bookings && userData.bookings.length > 0) {
            userData.bookings.forEach((booking) => {
              allBookings.push({
                ...booking,
                status: booking.status || "pending", // Default status to "pending"
                userName: userData.name,
                userEmail: userData.email,
                userId: userDoc.id, // Store user ID for later use
              });
            });
          }
        }

        setBookedRooms(allBookings);
      } catch (e) {
        alert("Error fetching bookings. Please try again.");
      }
    };

    fetchAllBookings();
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

  const handleApproveBooking = async (booking) => {
    try {
      const userRef = doc(db, "users", booking.userId);
      const updatedBookings = bookedRooms.map((b) =>
        b.roomNumber === booking.roomNumber ? { ...b, status: "approved" } : b
      );

      // Update booking status in Firestore
      await updateDoc(userRef, { bookings: updatedBookings });

      // Update state locally
      setBookedRooms(updatedBookings);
      alert("Booking approved successfully!");
    } catch (e) {
      alert("Error approving booking. Please try again.");
    }
  };

  const handleRejectBooking = async (booking) => {
    try {
      const userRef = doc(db, "users", booking.userId);
      const updatedBookings = bookedRooms.map((b) =>
        b.roomNumber === booking.roomNumber ? { ...b, status: "rejected" } : b
      );

      // Update booking status in Firestore
      await updateDoc(userRef, { bookings: updatedBookings });

      // Update state locally
      setBookedRooms(updatedBookings);
      alert("Booking rejected successfully!");
    } catch (e) {
      alert("Error rejecting booking. Please try again.");
    }
  };

  const handleDeleteBooking = async (booking) => {
    try {
      const userRef = doc(db, "users", booking.userId);
      const updatedBookings = bookedRooms.filter(
        (b) => b.roomNumber !== booking.roomNumber
      );

      // Update Firestore to remove the booking
      await updateDoc(userRef, { bookings: updatedBookings });

      // Update local state
      setBookedRooms(updatedBookings);
      alert("Booking deleted successfully!");
    } catch (e) {
      alert("Error deleting booking. Please try again.");
    }
  };

  const handleEditBooking = (booking) => {
    // This function could show a modal or form to allow editing the booking details
    alert("Edit functionality coming soon!"); // Placeholder for future edit functionality
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

      {/* Booked Rooms Table */}
      <h3 className="booked-rooms-title">Booked Rooms</h3>
      <div className="booked-rooms">
        {bookedRooms.length > 0 ? (
          <table className="booked-rooms-table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedRooms.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.userEmail}</td>
                  <td>
                    {new Date(
                      booking.checkInDate.seconds * 1000
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(
                      booking.checkOutDate.seconds * 1000
                    ).toLocaleDateString()}
                  </td>
                  <td>R{booking.totalPrice}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === "pending" && (
                      <>
                        <button
                          className="action-button"
                          onClick={() => handleApproveBooking(booking)}
                        >
                          Approve
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleRejectBooking(booking)}
                        >
                          Reject
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleEditBooking(booking)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleDeleteBooking(booking)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms booked yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

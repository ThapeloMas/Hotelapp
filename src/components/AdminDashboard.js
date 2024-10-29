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
import { db } from "../firebaseConfig"; // Adjust path as necessary
import "./AdminDashboard.css";

function AdminDashboard() {
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editRoomId, setEditRoomId] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [currentView, setCurrentView] = useState("addRoom"); // new state for view management
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
        const bookedCollection = await getDocs(collection(db, "booked"));
        const allBookings = [];

        for (const docSnapshot of bookedCollection.docs) {
          const userBookings = docSnapshot.data().bookings || [];
          const userId = docSnapshot.id;

          for (const booking of userBookings) {
            allBookings.push({
              roomNumber: booking.roomNumber,
              checkInDate: booking.checkInDate,
              checkOutDate: booking.checkOutDate,
              totalPrice: booking.totalPrice,
              userId,
              userEmail: booking.userEmail || "",
              status: booking.status || "pending",
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
      const newRoom = { roomNumber, price, location, photos };
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
    const updatedRoom = { roomNumber, price, location, photos };
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

  // Handlers for booking actions
  const handleApproveBooking = async (booking) => {
    try {
      const userRef = doc(db, "booked", booking.userId);
      const updatedBookings = bookedRooms.map((b) =>
        b.roomNumber === booking.roomNumber ? { ...b, status: "approved" } : b
      );

      await updateDoc(userRef, { bookings: updatedBookings });
      setBookedRooms(updatedBookings);
      alert("Booking approved successfully!");
    } catch (e) {
      alert("Error approving booking. Please try again.");
    }
  };

  const handleRejectBooking = async (booking) => {
    try {
      const userRef = doc(db, "booked", booking.userId);
      const updatedBookings = bookedRooms.map((b) =>
        b.roomNumber === booking.roomNumber ? { ...b, status: "rejected" } : b
      );

      await updateDoc(userRef, { bookings: updatedBookings });
      setBookedRooms(updatedBookings);
      alert("Booking rejected successfully!");
    } catch (e) {
      alert("Error rejecting booking. Please try again.");
    }
  };

  const handleDeleteBooking = async (booking) => {
    try {
      const userRef = doc(db, "booked", booking.userId);
      const updatedBookings = bookedRooms.filter(
        (b) => b.roomNumber !== booking.roomNumber
      );

      await updateDoc(userRef, { bookings: updatedBookings });
      setBookedRooms(updatedBookings);
      alert("Booking deleted successfully!");
    } catch (e) {
      alert("Error deleting booking. Please try again.");
    }
  };

  const handleEditBooking = (booking) => {
    alert("Edit functionality coming soon!");
  };

  return (
    <div className="admin-dashboard">
      <div className="nav-buttons">
        <button onClick={() => setCurrentView("addRoom")}>Add Room</button>
        <button onClick={() => setCurrentView("bookedRooms")}>
          Booked Rooms
        </button>
        <button onClick={() => setCurrentView("availableRooms")}>
          Available Rooms
        </button>
        <button disabled>Analytics</button>
      </div>

      {currentView === "addRoom" && (
        <div className="add-room-card">
          <h2 className="add-room-title">Add New Room</h2>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="add-room-input"
          />
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="add-room-input"
          />
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="add-room-input"
          />
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
      )}

      {currentView === "bookedRooms" && (
        <div>
          <h3 className="booked-rooms-title">Booked Rooms</h3>
          <table className="booked-rooms-table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>User ID</th>
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
                  <td>{booking.userId}</td>
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
                        <button onClick={() => handleApproveBooking(booking)}>
                          Approve
                        </button>
                        <button onClick={() => handleRejectBooking(booking)}>
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status === "approved" && (
                      <button onClick={() => handleDeleteBooking(booking)}>
                        Delete
                      </button>
                    )}
                    <button onClick={() => handleEditBooking(booking)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentView === "availableRooms" && (
        <div>
          <h2>Available Rooms</h2>
          <ul className="room-list">
            {rooms.map((room) => (
              <li key={room.id}>
                <span>Room {room.roomNumber}</span>
                <span>Price: R{room.price}</span>
                <button onClick={() => handleEditRoom(room)}>Edit</button>
                <button onClick={() => handleDeleteRoom(room.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

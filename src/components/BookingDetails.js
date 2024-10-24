import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingDetails.css";
import { db } from "../firebaseConfig"; // Assuming you have firebase configured
import { doc, getDoc } from "firebase/firestore";

function BookingDetails() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [room, setRoom] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If room data is passed in the state, use it. Otherwise, fetch it from Firestore.
    if (location.state?.room) {
      setRoom(location.state.room);
    } else {
      const fetchRoom = async () => {
        const roomRef = doc(db, "rooms", id);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoom({ id: roomSnap.id, ...roomSnap.data() });
        } else {
          alert("Room details not found.");
        }
      };
      fetchRoom();
    }
  }, [id, location.state]);

  const handleBooking = () => {
    if (!room) {
      alert("Room details are not available.");
      return;
    }

    const numDays = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    navigate("/payment", {
      state: {
        roomNumber: room.roomNumber,
        price: room.price,
        numDays,
        checkInDate,
        checkOutDate,
      },
    });
  };

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="booking-details">
      <h1>Check Out Room</h1>
      <div className="booking-container">
        <div className="booking-info">
          <div className="room-summary">
            <h2>Room {room.roomNumber}</h2>
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
          </div>
          <div className="check-in-out">
            <label>Check in</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
              className="date-picker"
            />
            <label>Check out</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
              className="date-picker"
            />
          </div>
          <button className="book-now" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;

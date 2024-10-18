import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
    };

    const fetchBookedRooms = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setBookedRooms(userDoc.data().bookings || []); // Fetch bookings array
        }
      }
    };

    fetchUserData();
    fetchBookedRooms();
  }, []);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile">
      <div className="profile-toggle" onClick={toggleProfile}>
        {user ? (
          <>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <span>{user.name}</span>
          </>
        ) : (
          <span>Profile</span>
        )}
      </div>

      {isOpen && (
        <div className="profile-details">
          <h2>{user?.name}</h2>
          <p>Email: {user?.email}</p>

          <h3>Booked Rooms</h3>
          <ul>
            {bookedRooms.map((room, index) => (
              <li key={index}>
                Room {room.roomNumber} <br />
                Check-in:{" "}
                {new Date(
                  room.checkInDate.seconds * 1000
                ).toLocaleDateString()}{" "}
                <br />
                Check-out:{" "}
                {new Date(
                  room.checkOutDate.seconds * 1000
                ).toLocaleDateString()}{" "}
                <br />
                Total Cost: R{room.totalPrice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

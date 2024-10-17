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
        const bookingsDoc = await getDoc(
          doc(db, "bookings", auth.currentUser.uid)
        );
        if (bookingsDoc.exists()) {
          setBookedRooms(bookingsDoc.data().rooms || []);
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
          <span>Loading...</span>
        )}
      </div>
      {isOpen && user && (
        <div className="profile-dropdown">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <h4>Booked Rooms:</h4>
          <ul>
            {bookedRooms.map((room, index) => (
              <li key={index}>Room {room.roomNumber}</li>
            ))}
          </ul>
          <button onClick={() => navigate("/profile")}>
            View Full Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

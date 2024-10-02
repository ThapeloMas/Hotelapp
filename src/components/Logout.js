// components/Logout.js
import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

import { auth } from "../firebaseConfig"; // Make sure to import your firebaseConfig

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to homepage after successful logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default Logout;

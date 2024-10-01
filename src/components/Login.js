import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods for fetching user data
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch user role from Firestore
  const getUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid)); // Fetch the user document
    if (userDoc.exists()) {
      return userDoc.data().role; // Return the user's role (e.g., "admin" or "user")
    }
    return null;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("User registered:", userCredential.user);
        const userRole = await getUserRole(userCredential.user.uid); // Fetch the user role

        // Navigate based on the role
        if (userRole === "admin") {
          navigate("/admin"); // Navigate to AdminDashboard if user is an admin
        } else {
          navigate("/rooms"); // Navigate to RoomCardsPage if user is not an admin
        }

        setError(""); // Clear any existing error
      })
      .catch((error) => {
        // Catch errors and set an error message
        if (error.code === "auth/email-already-in-use") {
          setError("Email is already in use.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email format.");
        } else if (error.code === "auth/weak-password") {
          setError("Password should be at least 6 characters.");
        } else {
          setError("Error signing up.");
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("User logged in:", userCredential.user);

        const userRole = await getUserRole(userCredential.user.uid); // Fetch the user role
        console.log("User Role:", userRole);

        // Navigate based on the role
        if (userRole === "admin") {
          navigate("/admin"); // Navigate to AdminDashboard if user is an admin
        } else {
          navigate("/rooms"); // Navigate to RoomCardsPage if user is not an admin
        }

        setError(""); // Clear any existing error
      })
      .catch((error) => {
        // Catch errors and set an error message
        if (error.code === "auth/wrong-password") {
          setError("Incorrect password.");
        } else if (error.code === "auth/user-not-found") {
          setError("No user found with this email.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email format.");
        } else {
          setError("Error while logging in.");
        }
      });
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setIsLogin(!isLogin)}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            {isLogin ? (
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form" onSubmit={handleLogin}>
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="flip-card__btn" type="submit">
                    Let's go!
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </form>
              </div>
            ) : (
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form" onSubmit={handleSignUp}>
                  <input
                    className="flip-card__input"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="flip-card__btn" type="submit">
                    Confirm!
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </form>
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export default Login;

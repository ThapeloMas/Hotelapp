import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isUser, setIsUser] = useState("user");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        setError(""); // Clear any existing error
        navigate("/rooms"); // Navigate to RoomCardsPage after signup
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
          setError("Error signing up.Email or password is wrong");
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        setError(""); // Clear any existing error
        navigate("/rooms"); // Navigate to RoomCardsPage after login
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
          setError("Error while logging in.Email or password is wrong");
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

import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods for fetching and saving user data
import "./Login.css";
import vid from "../images/mixkit-sunset-on-a-beach-seen-from-a-terrace-44500-full-hd.mp4";
import Loading from "./Loading";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // State for profile picture
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // State for terms acceptance
  const navigate = useNavigate();

  const getUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        profilePicture,
        role: "user",
      });

      const userRole = await getUserRole(userCredential.user.uid);
      navigate(userRole === "admin" ? "/admin" : "/rooms");
      setError("");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);

      const userRole = await getUserRole(userCredential.user.uid);
      console.log("User Role:", userRole);
      navigate(userRole === "admin" ? "/admin" : "/bookingdetails");
      setError("");
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email is already in use.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/user-not-found":
        return "No user found with this email.";
      default:
        return "Error occurred.";
    }
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetEmailSent(true);
        setError("");
      })
      .catch(() => {
        setError(
          "Failed to send password reset email. Make sure the email is valid."
        );
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the base64 image
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  return (
    <div className="wrapper">
      {/* Video background */}
      <video autoPlay loop muted className="background-video">
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
                <div className="title">click here to sign up</div>
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
                  <button
                    className="flip-card__input"
                    onClick={handlePasswordReset}
                  >
                    Forgot Password?
                  </button>
                  {resetEmailSent && <p>Password reset email sent!</p>}
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
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="flip-card__input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* File input for profile picture */}
                  <input
                    className="flip-card__input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="terms-acceptance">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    <label>
                      I accept the{" "}
                      <Link to="/terms-and-conditions" target="_blank">
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                  <button
                    className="flip-card__btn"
                    type="submit"
                    disabled={!termsAccepted}
                  >
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

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth"; // Custom hook for authentication status
import Logout from "./Logout";
import UserProfile from "./UserProfile";

function Navbar() {
  const { user } = useAuth(); // Get the authentication state
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header>
      <div className="logo">
        <h1>
          Malapeng <span className="highlight">Hotel</span>
        </h1>
      </div>
      <nav ref={navRef} className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Book Now</Link>
        <ScrollLink
          to="gallery-section"
          smooth={true}
          duration={500}
          offset={-50}
        >
          Gallery
        </ScrollLink>

        {/* Conditional rendering based on authentication status */}
        <div className="auth-buttons">
          {!user ? (
            <>
              <Link to="/login">
                <button className="nav-links">Sign in</button>
              </Link>
              <Link to="/login">
                <button className="nav-links">Register</button>
              </Link>
            </>
          ) : (
            <div className="user-auth-buttons">
              <button className="profile-btn" onClick={goToProfile}>
                Profile
              </button>
              <Logout />
            </div>
          )}
        </div>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;

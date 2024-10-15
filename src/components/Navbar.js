import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div className="logo">
        <h1>
          Malapeng <span className="highlight">Hotel</span>
        </h1>
      </div>
      <nav ref={navRef} className="nav-links">
        {" "}
        {/* Attach navRef here */}
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
        <div className="auth-buttons">
          <Link to="/login">
            <button className="signin-btn">Sign in</button>
          </Link>
          <Link to="/login">
            <button className="register-btn">Register</button>
          </Link>
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

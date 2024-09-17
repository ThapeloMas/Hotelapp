import React from "react";
import "./Homepage.css";
import hotelpic from '../hoteland.jpg';
import gpic from '../images/3B.jpg';
import gpic2 from '../images/1B.jpg';
import gpic3 from "../images/2H.jpg";
import gpic4 from "../images/H3.jpg";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="navbar">
        <div className="logo">
          <h1>
            Malapeng <span className="highlight">Hotel</span>
          </h1>
        </div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Book Now</a>
          <a href="#">Gallery</a>
          <a href="#">About Us</a>
          <div className="auth-buttons">
            <button className="signin-btn">Sign in</button>
            <button className="register-btn">Register</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>
            Welcome to your perfect stay! Discover a world of{" "}
            <span className="highlight">comfort and luxury</span> at our hotel,
          </h2>
          <p>
            Whether you're here for business or leisure, we promise a stay that
            feels like home, but better. Book now and let your dream getaway
            begin!
          </p>
          <button className="book-now-btn">Book Now</button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h3>Gallery</h3>
        <div className="gallery">
          <button className="gallery-arrow">&lt;</button>
          <div className="gallery-images">
            <img src={gpic} alt="Room 1" />
            <img src={gpic2} alt="Room 2" />
            <img src={gpic3} alt="Room 2" />
          </div>
          <button className="gallery-arrow">&gt;</button>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities">
        <div className="icons">
          {/* Add amenity icons here */}
          <img src={hotelpic} alt="Icon 1" />
        </div>
        <div className="description">
          <p>
            Finding the perfect hotel room is about more than just a place to
            sleep—it's where your travel memories are made! Whether you crave
            stunning views, luxurious amenities, or a cozy corner to unwind,
            choosing the right room turns your stay into an unforgettable
            experience. Treat yourself to the room that suits your style, and
            make every moment of your stay truly yours!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <h4>Use Cases</h4>
            <ul>
              <li>UI Design</li>
              <li>UX Design</li>
              <li>Wireframing</li>
              <li>Team Collaboration</li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>Design</li>
              <li>Prototyping</li>
              <li>Collaboration Features</li>
              <li>Design Systems</li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Support</li>
              <li>Best Practices</li>
              <li>Color Wheel</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;


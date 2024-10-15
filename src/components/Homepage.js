import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import "./Homepage.css";
import hotelpic from "../hoteland.jpg";
import gpic from "../images/3B.jpg";
import gpic2 from "../images/1B.jpg";
import gpic3 from "../images/2H.jpg";
import heroImg1 from "../images/pexels-pixabay-276671.jpg";
import heroImg2 from "../images/2B.jpg";
import heroImg3 from "../images/1H.jpg";

const Homepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroImg1, heroImg2, heroImg3];

  const galleryImages = [gpic, gpic2, gpic3];
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNextImage = () => {
    setGalleryImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setGalleryImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="homepage">
      
      <section
        className="hero"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
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
          <Link to="/rooms">
            <button className="book-now-btn">Book Now</button>
          </Link>{" "}
        </div>
      </section>

      <section id="gallery-section" className="gallery-section">
        <h3>Gallery</h3>
        <div className="gallery">
          <button className="gallery-arrow" onClick={handlePrevImage}>
            &lt;
          </button>
          <div className="gallery-images">
            <img
              src={galleryImages[galleryImageIndex]}
              alt={`Room ${galleryImageIndex + 1}`}
            />
          </div>
          <button className="gallery-arrow" onClick={handleNextImage}>
            &gt;
          </button>
        </div>
      </section>

      <section className="amenities">
        <div className="icons">
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

      <footer className="footer">
        <div className="footer-links">
          <div>
            <h4>Contact US</h4>
            <ul>
              <li>011 345 4456</li>
              <li>helpline@malapeng.co.za</li>
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
              <li>Gallery</li>
              <li>Socials</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

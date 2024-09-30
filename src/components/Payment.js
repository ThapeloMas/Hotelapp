
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const { roomNumber, price, numDays } = location.state || {};

  // Calculate the total price
  const totalPrice = numDays * price;

  // State for form fields
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const validatePayment = () => {
    let errorMessages = [];

    // Check if name is not empty
    if (!name.trim()) {
      errorMessages.push("Please enter your full name.");
    }

    // Validate card number (16 digits)
    if (cardNumber.length !== 16) {
      errorMessages.push("Card number must be 16 digits long.");
    }

    // Validate CVV (3 digits)
    if (cvv.length !== 3) {
      errorMessages.push("CVV must be 3 digits long.");
    }

    // If there are errors, show the error messages in an alert
    if (errorMessages.length > 0) {
      alert(`Booking not successful:\n${errorMessages.join("\n")}`);
    } else {
      // If everything is valid, show a success message
      alert("Booking successful!");
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    validatePayment();
  };

  return (
    <div className="payment-wrapper">
      <div className="modal">
        <form className="form" onSubmit={handleCheckout}>
          <div className="payment--options"></div>

          <div className="separator">
            <hr className="line" />
            <h1>Book now</h1>
            <hr className="line" />
          </div>

          {roomNumber && (
            <div className="room-details">
              <h2>Room Number: {roomNumber}</h2>
              <h3>Total Nights: {numDays}</h3>
              <h3>Total Amount: ${totalPrice}</h3>
            </div>
          )}

          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="name_field" className="input_label">
                Card holder full name
              </label>
              <input
                id="name_field"
                className="input_field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="input_container">
              <label htmlFor="card_field" className="input_label">
                Card Number
              </label>
              <input
                id="card_field"
                className="input_field"
                type="number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                maxLength="16"
              />
            </div>

            <div className="input_container">
              <label htmlFor="expiry_field" className="input_label">
                Expiry Date / CVV
              </label>
              <div className="split">
                <input
                  id="expiry_field"
                  className="input_field"
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="01/23"
                />
                <input
                  id="cvv_field"
                  className="input_field"
                  type="number"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  maxLength="3"
                />
              </div>
            </div>
          </div>
          <button className="purchase--btn" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore"; // Firestore imports
import "./Payment.css";

// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51Q9ih1RuIWNyWIUihRX8W86PxHIYUxOfPoJ4KQubbplNkx6uljtZQHAMATIRVx6sOciRKO8W42Lwsr2dapCIZ5el00xFTr7iub"
);

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { roomNumber, price, numDays, checkInDate, checkOutDate } =
    location.state || {};

  // Calculate the total price
  const totalPrice = numDays * price;

  // State for form fields
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      navigate("/payment-failure");
    } else {
      try {
        // Save the booking data in Firestore
        const bookingDetails = {
          roomNumber,
          checkInDate, // Store check-in date
          checkOutDate, // Store check-out date
          totalPrice, // Store total price
        };

        // Reference to the user's booking document
        const userRef = doc(db, "booked", auth.currentUser.uid);

        // Ensure the document exists or create a new one if it doesn't
        await setDoc(userRef, { bookings: [] }, { merge: true });

        // Update Firestore with the new booking details
        await updateDoc(userRef, {
          bookings: arrayUnion(bookingDetails), // Append new booking to the user's bookings array
        });

        // Navigate to the success page
        navigate("/payment-success");
      } catch (err) {
        console.error("Error saving booking: ", err);
        setErrorMessage("Failed to save booking. Please try again.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="modal">
        <form className="form" onSubmit={handleCheckout}>
          <div className="separator">
            <hr className="line" />
            <h1>Book now</h1>
            <hr className="line" />
          </div>

          {roomNumber && (
            <div className="room-details">
              <h2>Room Number: {roomNumber}</h2>
              <h3>Total Nights: {numDays}</h3>
              <h3>Total Amount: R{totalPrice}</h3>
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
                required
              />
            </div>

            <div className="input_container">
              <label className="input_label">Card Details</label>
              <CardElement className="input_field" />
            </div>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>

          <button
            className="purchase--btn"
            type="submit"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? "Processing..." : "Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;

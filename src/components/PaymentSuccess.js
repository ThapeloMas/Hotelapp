import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentResult.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h2>Your payment was successful</h2>
            <p>
              Thank you for your payment. We will be in contact with more
              details shortly.
            </p>
            <button onClick={() => navigate("/")} className="back-btn">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

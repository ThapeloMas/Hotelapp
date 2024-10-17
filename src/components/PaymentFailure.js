import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentResult.css";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success _failed">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
            <h2>Your payment failed</h2>
            <p>Try again later.</p>
            <button onClick={() => navigate("/")} className="back-btn">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

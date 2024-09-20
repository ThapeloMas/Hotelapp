
import React from "react";
import "./Payment.css";

const Payment = () => {
  return (
    <div className="payment-wrapper">
      <div className="modal">
        <form className="form">
          <div className="payment--options"></div>

          <div className="separator">
            <hr className="line" />
            <h1>Book now</h1>
            <hr className="line" />
          </div>
          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="name_field" className="input_label">
                Card holder full name
              </label>
              <input
                id="name_field"
                className="input_field"
                type="text"
                name="input-name"
                title="Input title"
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
                name="input-name"
                title="Input title"
                placeholder="0000 0000 0000 0000"
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
                  name="input-name"
                  title="Expiry Date"
                  placeholder="01/23"
                />
                <input
                  id="cvv_field"
                  className="input_field"
                  type="number"
                  name="cvv"
                  title="CVV"
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>
          <button className="purchase--btn">Checkout</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

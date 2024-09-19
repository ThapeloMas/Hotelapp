
import React from "react";
import styled from "styled-components";
import "./Payment.css"; 


const Payment = () => {
  return (
    <StyledWrapper>
      <div className="modal">
        <form className="form">
          <div className="payment--options">
            
          </div>
          <div className="separator">
            <hr className="line" />
            <h1>Book now</h1>
            <hr className="line" />
          </div>
          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="password_field" className="input_label">
                Card holder full name
              </label>
              <input
                id="password_field"
                className="input_field"
                type="text"
                name="input-name"
                title="Inpit title"
                placeholder="Enter your full name"
              />
            </div>
            <div className="input_container">
              <label htmlFor="password_field" className="input_label">
                Card Number
              </label>
              <input
                id="password_field"
                className="input_field"
                type="number"
                name="input-name"
                title="Inpit title"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="input_container">
              <label htmlFor="password_field" className="input_label">
                Expiry Date / CVV
              </label>
              <div className="split">
                <input
                  id="password_field"
                  className="input_field"
                  type="text"
                  name="input-name"
                  title="Expiry Date"
                  placeholder="01/23"
                />
                <input
                  id="password_field"
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
 
`;

export default Payment;

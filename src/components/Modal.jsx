import React from "react";
import { Link } from "react-router-dom";

const Modal = ({isModalOpen, setIsModalOpen}) => {
  return (
    <div className={`cart-modal-overlay ${isModalOpen ? "active" : ""}`}>
      <div className="cart-modal">
        <h2>Login Required</h2>
        <p>Please log in first to access the cart.</p>

        <div className="cart-modal-btns">
          <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>

          <Link to="/login" onClick={() => setIsModalOpen(false)}>
            <button className="login-btn">Go to Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;

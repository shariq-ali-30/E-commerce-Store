import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <div className="cart-page">
        <div className="container">
          <Link to="/" className="back-to-home-btn cart-back-btn">
            <i className="ph-bold ph-arrow-left"></i> Back to Home
          </Link>

          <h1 className="cart-title">Shopping Cart</h1>

          <div className="cart-container">
            <div className="cart-items-section">
              <div className="cart-item">
                <div className="cart-item-img">
                  <img
                    src="https://dummyjson.com/image/i/products/1/thumbnail.jpg"
                    alt="Product"
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3 className="cart-item-title">Premium Men's T-Shirt</h3>
                    <p className="cart-item-price">$29.99</p>
                  </div>
                  <p className="cart-item-category">Men's Shirts</p>

                  <div className="cart-item-bottom">
                    <div className="quantity-selector">
                      <button>-</button>
                      <span>1</span>
                      <button>+</button>
                    </div>
                    <button className="remove-btn">
                      <i className="ph ph-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item">
                <div className="cart-item-img">
                  <img
                    src="https://dummyjson.com/image/i/products/2/thumbnail.jpg"
                    alt="Product"
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3 className="cart-item-title">Luxury Watch</h3>
                    <p className="cart-item-price">$199.99</p>
                  </div>
                  <p className="cart-item-category">Men's Watches</p>

                  <div className="cart-item-bottom">
                    <div className="quantity-selector">
                      <button>-</button>
                      <span>2</span>
                      <button>+</button>
                    </div>
                    <button className="remove-btn">
                      <i className="ph ph-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-summary-section">
              <h2>Order Summary</h2>
              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>$429.97</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>$5.00</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row total">
                  <span>Total</span>
                  <span>$444.97</span>
                </div>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout <i className="ph-bold ph-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

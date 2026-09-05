import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const dummyCartItems = [
    {
      id: 1,
      title: "Mens Casual Slim Fit",
      price: 22.3,
      quantity: 1,
      image: "https://cdn.dummyjson.com/products/images/mens-shirts/Mens%20Casual%20Slim%20Fit/1.png"
    },
    {
      id: 2,
      title: "Womens Dress",
      price: 55.99,
      quantity: 2,
      image: "https://cdn.dummyjson.com/products/images/womens-dresses/Womens%20Dress/1.png"
    },
  ];

  return (
    <div className="container">
      <div className="cart-page">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        <div className="cart-container">
          <div className="cart-items-section">
            {dummyCartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
              </div>
            ) : (
              <div className="cart-items-list">
                {dummyCartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-img">
                      <img src={item.image} alt={item.title} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-price">${item.price}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button className="qty-btn"><i className="ph-bold ph-minus"></i></button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn"><i className="ph-bold ph-plus"></i></button>
                      </div>
                      <button className="remove-btn">
                        <i className="ph-bold ph-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Order Summary */}
          {dummyCartItems.length > 0 && (
            <div className="cart-summary-section">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal (3 items)</span>
                  <span>$134.28</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-$10.00</span>
                </div>
                
                <hr className="summary-divider" />
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>$124.28</span>
                </div>

                <button className="checkout-btn">Proceed to Checkout</button>
                <Link to="/" className="continue-shopping-link">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
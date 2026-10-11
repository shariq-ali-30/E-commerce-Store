import { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { productsData } from "../productsData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const Cart = () => {
  const { currentUser, userData } = useContext(UserContext);

  // States
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const [cartEntries, setCartEntries] = useState([]);

  const cartItems = Array.isArray(userData?.cart) ? userData.cart : [];

  // Firebase se cart data process karo
  useEffect(() => {
    if (!currentUser) {
      setCartEntries([]);
      setCartIsLoading(false);
      return;
    }

    // Jab tak user data load nahi hota, loading state rahegi
    if (userData && Object.keys(userData).length > 0) {
      const entries = (Array.isArray(userData.cart) ? userData.cart : [])
        .map((cartItem) => ({
          cartItem,
          product: productsData.find(
            (p) => String(p.id) === String(cartItem.productId),
          ),
        }))
        .filter(({ product }) => product);

      setCartEntries(entries);
      setCartIsLoading(false);
    }
  }, [currentUser, userData]);

  // Subtotal
  const subtotal = cartEntries.reduce(
    (total, { cartItem, product }) => total + product.price * cartItem.qty,
    0,
  );

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Remove item
  const removeItem = async (id) => {
    const updatedCart = cartItems.filter(
      (item) => String(item.productId) !== String(id),
    );

    await updateDoc(doc(db, "users", currentUser), {
      cart: updatedCart,
    });
  };

  // Increase quantity
  const increaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      String(item.productId) === String(id)
        ? { ...item, qty: item.qty + 1 }
        : item,
    );

    await updateDoc(doc(db, "users", currentUser), {
      cart: updatedCart,
    });
  };

  // Decrease quantity
  const decreaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      String(item.productId) === String(id)
        ? {
            ...item,
            qty: Math.max(1, item.qty - 1),
          }
        : item,
    );

    await updateDoc(doc(db, "users", currentUser), {
      cart: updatedCart,
    });
  };

  return (
    <div className="cart-page">
      <div className="container">
        <div
          onClick={() => window.history.back()}
          className="back-to-home-btn cart-back-btn"
        >
          <i className="ph-bold ph-arrow-left"></i> Back
        </div>

        <h1 className="cart-title">Shopping Cart</h1>

        {cartIsLoading ? (
          <div className="cart-loading-state">
            <span className="cart-loading-spinner"></span>
            <p>Loading cart...</p>
          </div>
        ) : cartEntries.length === 0 ? (
          <div className="cart-empty-state">
            <i className="ph ph-shopping-cart"></i>

            <h2>Your Cart Is Empty</h2>

            <p>You haven't added any products to your cart yet.</p>

            <button onClick={() => window.history.back()} className="cart-empty-btn">
              Continue Shopping
              <i className="ph ph-arrow-right"></i>
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-section">
              {cartEntries.map(({ cartItem, product }) => (
                <div className="cart-item" key={cartItem.productId}>
                  <div className="cart-item-img">
                    <Link to={`/details/${cartItem.productId}`}>
                      <img src={product.images[0]} alt={product.title} />
                    </Link>
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3 className="cart-item-title">{product.title}</h3>

                      <p className="cart-item-price">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>

                    <p className="cart-item-category">{product.category}</p>

                    <div className="cart-item-bottom">
                      <div className="quantity-selector">
                        <button
                          onClick={() => decreaseQuantity(cartItem.productId)}
                        >
                          -
                        </button>

                        <span>{cartItem.qty}</span>

                        <button
                          onClick={() => increaseQuantity(cartItem.productId)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(cartItem.productId)}
                        className="remove-btn"
                      >
                        <i className="ph ph-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <h2>Order Summary</h2>

              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
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
                  <span>${(subtotal + 15).toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout
                <i className="ph-bold ph-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

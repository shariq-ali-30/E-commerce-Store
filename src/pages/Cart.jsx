import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { productsData } from "../productsData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const Cart = () => {
  let { currentUser, userData } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to={"/"} />;
  }

  let removeItem = async (id) => {
    let docRef = doc(db, "users", currentUser);

    let updatedCart = userData.cart.filter(
      (cartItem) => cartItem.productId !== id,
    );

    await updateDoc(docRef, {
      cart: updatedCart,
    });
  };

  let increaseQuantity = async (id) => {
    let docRef = doc(db, "users", currentUser);
    let updatedCart = userData.cart.map((cartItem) =>
      cartItem.productId == id
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem,
    );
    await updateDoc(docRef, {
      cart: updatedCart,
    });
  };

  let decreaseQuantity = async (id) => {
    let docRef = doc(db, "users", currentUser);
    let updatedCart = userData.cart.map((cartItem) =>
      cartItem.productId == id
        ? {
            ...cartItem,
            qty: cartItem.qty > 1 ? cartItem.qty - 1 : cartItem.qty,
          }
        : cartItem,
    );
    await updateDoc(docRef, {
      cart: updatedCart,
    });
  };

  return (
    <>
      <div className="cart-page">
        <div className="container">
          <div
            onClick={() => window.history.back()}
            className="back-to-home-btn cart-back-btn"
          >
            <i className="ph-bold ph-arrow-left"></i> Back
          </div>

          <h1 className="cart-title">Shopping Cart</h1>

          <div className="cart-container">
            <div className="cart-items-section">
              {userData?.cart?.map((cartItem, idx) => {
                let product = productsData.find(
                  (p) => p.id == cartItem.productId,
                );

                return (
                  <div className="cart-item" key={idx}>
                    <div className="cart-item-img">
                      <Link to={`/details/${cartItem.productId}`}>
                        <img src={product.images[0]} alt="Product" />
                      </Link>
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h3 className="cart-item-title">{product.title}</h3>
                        <p className="cart-item-price">${product.price}</p>
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
                );
              })}
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

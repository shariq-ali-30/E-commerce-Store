import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import Modal from "../components/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { productsData } from "../productsData";

const ProductDetails = ({ isModalOpen, setIsModalOpen }) => {
  let { id } = useParams();
  let product = productsData.find((product) => product.id == id);
  let [currentImage, setCurrentImage] = useState(0);
  let { currentUser, userData } = useContext(UserContext);

  let changeImage = (index) => {
    setCurrentImage(index);
  };

  let addToCart = async (id) => {
    if (!currentUser) {
      return setIsModalOpen(true);
    }

    let isExist = userData.cart.find((cartItem) => cartItem.productId == id);

    if (isExist) {
      let updatedCart = userData.cart.map((cartItem) =>
        cartItem == isExist ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem,
      );

      let docRef = doc(db, "users", currentUser);

      await updateDoc(docRef, {
        cart: updatedCart,
      });
      return;
    }

    let docRef = doc(db, "users", currentUser);

    await updateDoc(docRef, {
      cart: [...userData.cart, { productId: id, qty: 1 }],
    });
  };

  return (
    <>
      <div className="container" id="product-details">
        <div onClick={() => window.history.back()} className="back-to-home-btn">
          <i className="ph-bold ph-arrow-left"></i> Back
        </div>

        <section className="product-details-section">
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[currentImage]} alt={product.title} />
            </div>
            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${currentImage == index ? "active" : ""}`}
                  onClick={() => changeImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <span className="category-badge">{product.category}</span>

            <h1 className="title">{product.title}</h1>

            <div className="rating">
              <i className="ph-fill ph-star"></i> {product.rating}{" "}
              <span>({product.reviews?.length || 0} Reviews)</span>
            </div>

            <div className="price-container">
              <span className="current-price">${product.price}</span>
              <span className="old-price">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            </div>

            <p className="description">{product.description}</p>

            <div className="meta-details">
              <div className="meta-item">
                <span className="meta-label">Brand:</span>
                <span className="meta-value">{product.brand}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className="meta-value in-stock">
                  {product.availabilityStatus} ({product.stock} left)
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Shipping:</span>
                <span className="meta-value">
                  {product.shippingInformation}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Return Policy:</span>
                <span className="meta-value">{product.returnPolicy}</span>
              </div>
            </div>

            <hr className="divider" />

            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product.id)}
              >
                <i className="ph ph-shopping-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        </section>
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      </div>
    </>
  );
};

export default ProductDetails;

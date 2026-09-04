import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  let [loading, setLoading] = useState(true);
  let { id } = useParams();

  let [product, setProduct] = useState(null);

  let getData = async () => {
    setLoading(true);
    let res = await fetch(`https://dummyjson.com/products/${id}`);
    let product = await res.json();

    setProduct(product);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {!loading && (
        <div className="container" id="product-details">
          <section className="product-details-section">
            <div className="product-gallery">
              <div className="main-image">
                <img src={product.images[0]} alt={product.title} />
              </div>
              <div className="thumbnail-list">
                {product.images.map((img, index) => (
                  <div key={index} className="thumbnail">
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
                <span>({product.reviews.length} Reviews)</span>
              </div>

              <div className="price-container">
                <span className="current-price">${product.price}</span>
                <span className="old-price">${product.price}</span>
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
                <button className="add-to-cart-btn">
                  <i className="ph ph-shopping-cart"></i> Add to Cart
                </button>

                <button className="wishlist-btn">
                  <i className="ph ph-heart"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductDetails;

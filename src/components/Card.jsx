const Card = ({ product }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={product.images[0]} alt="kuch bhii" />
      </div>
      <div className="content">
        <h3 className="title">{product.title}</h3>
        <p className="rating">
          <i className="ph-fill ph-star"></i> {product.rating}
          <span>({product.reviews.length})</span>
        </p>
        <span className="price">
          ${product.price}{" "}
          <span>
            $
            {(product.price / (1 - product.discountPercentage / 100)).toFixed(
              2,
            )}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Card;

const Card = ({product}) => {
  return (
    <div className="card">
      <div className="image">
        <button className="like-btn">
          <i className="ph ph-heart"></i>
        </button>
        <img
          src={product.images[0]}
          alt="kuch bhii"
        />
        <p>Men</p>
      </div>
      <div className="content">
        <h3 className="title">{product.title}</h3>
        <p className="rating">
          <i className="ph-fill ph-star"></i> {product.rating} <span>(13)</span>
        </p>
        <span className="price">
          RS. 2000 <span>RS. 3000</span>
        </span>
        <button>
          <i className="ph ph-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;

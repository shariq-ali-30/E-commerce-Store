import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="image">
        <button className="like-btn">
          <i className="ph ph-heart"></i>
        </button>
        <img
          src="httpsencrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgvnyw9Oc24sU-2IgYzk0bmkUwayaeV3gBQ0Zn-LMiJw&s"
          alt="kuch bhii"
        />
        <p>Men</p>
      </div>
      <div className="content">
        <h3 className="title">Casual Cotton Shirt</h3>
        <p className="rating">
          <i className="ph-fill ph-star"></i> 4.5 <span>(13)</span>
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

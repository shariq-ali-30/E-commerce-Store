import React, { useEffect, useState } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { Link } from "react-router-dom";

const WomenSection = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);

  let getData = async () => {
    setLoading(true);
    let res1 = await fetch(
      "https://dummyjson.com/products/category/womens-dresses",
    );

    let res2 = await fetch(
      "https://dummyjson.com/products/category/womens-bags",
    );

    let res3 = await fetch(
      "https://dummyjson.com/products/category/womens-shoes",
    );

    let data1 = await res1.json();
    let data2 = await res2.json();
    let data3 = await res3.json();

    setData([...data1.products, ...data2.products, ...data3.products]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="women">
      <h2 className="section-title">
        Women's Collection <span></span>
      </h2>

      <div className="cards">
        {loading
          ? Array.from({ length: 15 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : data.map((product) => (
              <Link key={product.id} to={`pages/details/${product.id}`}>
                <Card product={product} />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default WomenSection;

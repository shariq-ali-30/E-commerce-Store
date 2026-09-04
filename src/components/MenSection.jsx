import React, { useEffect, useState } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { Link } from "react-router-dom";

const MenSection = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);

  let getData = async () => {
    setLoading(true);
    try {
      let res1 = await fetch(
        "https://dummyjson.com/products/category/mens-shirts",
      );
      let res2 = await fetch(
        "https://dummyjson.com/products/category/mens-shoes",
      );
      let res3 = await fetch(
        "https://dummyjson.com/products/category/mens-watches",
      );

      let data1 = await res1.json();
      let data2 = await res2.json();
      let data3 = await res3.json();

      setData([
        ...data1.products,
        ...data2.products,
        ...data3.products.slice(0, 5),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="men">
      <h2 className="section-title">
        Men's Collection <span></span>
      </h2>
      <div className="cards">
        {loading
          ? Array.from({ length: 15 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : data.map((product) => (
              <Link key={product.id} to={`pages/details/${product.id}`}>
                <Card key={product.id} product={product} />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default MenSection;

import React, { useEffect, useState } from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

const KidsSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);

    try {
      const [shirts, shoes, bags, sunglasses] = await Promise.all([
        fetch("https://dummyjson.com/products/category/tops?limit=5"),
        fetch("https://dummyjson.com/products/category/mens-shoes?limit=3"),
        fetch("https://dummyjson.com/products/category/bags?limit=3"),
        fetch("https://dummyjson.com/products/category/sunglasses?limit=3"),
      ]);

      if (!shirts.ok || !shoes.ok || !bags.ok || !sunglasses.ok) {
        throw new Error("Failed to fetch products");
      }

      const [shirtsData, shoesData, bagsData, sunglassesData] =
        await Promise.all([
          shirts.json(),
          shoes.json(),
          bags.json(),
          sunglasses.json(),
        ]);

      setData([
        ...shirtsData.products,
        ...shoesData.products,
        ...bagsData.products,
        ...sunglassesData.products,
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
    <section id="kids">
      <h2 className="section-title">
        Kids Collection <span></span>
      </h2>

      <div className="cards">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : data.map((product) => <Card key={product.id} product={product} />)}
      </div>
    </section>
  );
};

export default KidsSection;

import React, { useEffect, useState } from "react";
import Card from "./Card";

const MenSection = () => {
  let [data, setData] = useState([]);

  let getData = async () => {
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

    setData([...data1.products, ...data2.products, ...data3.products]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="menSection">
      {data.map((product) => (
        <Card key={product.id} product={product}/>
      ))}
    </section>
  );
};

export default MenSection;

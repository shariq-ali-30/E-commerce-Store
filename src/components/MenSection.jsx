import Card from "./Card";
import { Link } from "react-router-dom";
import { productsData } from "../productsData.js";

const MenSection = () => {
  let mensData = productsData.filter(
    (product) =>
      product.category == "mens-shirts" ||
      product.category == "mens-shoes" ||
      product.category == "mens-watches",
  );
  return (
    <section id="men">
      <h2 className="section-title">
        Men's Collection <span></span>
      </h2>
      <div className="cards">
        {mensData.map((product) => (
          <Link key={product.id} to={`details/${product.id}`}>
            <Card key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MenSection;

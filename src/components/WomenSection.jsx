import Card from "./Card";
import { Link } from "react-router-dom";
import { productsData } from "../productsData.js";

const WomenSection = () => {
  let womensData = productsData.filter(
    (product) =>
      product.category == "womens-dresses" ||
      product.category == "womens-bags" ||
      product.category == "womens-shoes",
  );
  return (
    <section id="women">
      <h2 className="section-title">
        Women's Collection <span></span>
      </h2>
      <div className="cards">
        {womensData.map((product) => (
          <Link key={product.id} to={`details/${product.id}`}>
            <Card key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WomenSection;

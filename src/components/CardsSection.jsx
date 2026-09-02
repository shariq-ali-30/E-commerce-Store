import MenSection from "./MenSection";

const CardsSection = () => {
  return (
    <div className="container">
      <section className="cards-section">
        <h2>Featured Products</h2>

        <div className="cards">
          <MenSection />
        </div>
      </section>
    </div>
  );
};

export default CardsSection;

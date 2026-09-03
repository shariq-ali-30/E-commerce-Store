import KidsSection from "./KidsSection";
import MenSection from "./MenSection";
import WomenSection from "./WomenSection";

const CardsSection = () => {
  return (
    <div className="container">
      <section className="cards-section">
        <MenSection />
        <WomenSection />
        <KidsSection />
      </section>
    </div>
  );
};

export default CardsSection;

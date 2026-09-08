import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CardsSection from "../components/CardsSection";
import Footer from "../components/Footer";

const Home = ({isModalOpen, setIsModalOpen}) => {
  return (
    <>
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <HeroSection />
      <CardsSection />
      <Footer />
    </>
  );
};

export default Home;

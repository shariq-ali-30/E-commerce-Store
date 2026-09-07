import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CardsSection from "../components/CardsSection";
import Footer from "../components/Footer";
import { useState } from "react";

const Home = () => {

  let [isModalOpen, setIsModalOpen] = useState(false);

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

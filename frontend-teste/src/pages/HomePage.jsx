import hero from "../assets/hero.png";
import Navbar from "@/components/Navbar";
import CarouselItemDisplay from "@/components/CarouselItemDisplay";
import ItemDisplay from "@/components/ItemDisplay";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <img src={hero} alt="" />
      <CarouselItemDisplay />
      <ItemDisplay />
      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";
import { productsAssets } from "../assets/assets";
import CarouselItem from "./CarouselItem";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

export default function ItemDisplay() {
  const [products, setProducts] = useState([]); // Inicializa como array vazio
  const [current, setCurrent] = useState(0); // Índice atual do slide

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setProducts(productsAssets); // Popula o estado com os produtos
  }, []);

  return (
    <>
      <div className="m-10 text-white">
        <h2 className="text-3xl">Pode ser do Seu Interesse</h2>
      </div>
      <div className="w-[85vw] m-auto relative overflow-hidden">
        {/* Contêiner dos itens */}
        <div
          className="flex transition-transform ease-out duration-500 gap-10 py-3 px-3"
          style={{
            transform: `translateX(-${current * 10}%)`,
            // Ajusta a largura do contêiner principal
          }}
        >
          {products.map((item, index) => (
            <CarouselItem
              key={index}
              description={item.description}
              image={item.image[0]}
              price={item.price}
            />
          ))}
        </div>

        {/* Botões de navegação */}
        <div className="text-white">
          <button onClick={prevSlide} className="absolute top-[45%] left-4">
            <CircleChevronLeft size={35} />
          </button>
          <button onClick={nextSlide} className="absolute top-[45%] right-4">
            <CircleChevronRight size={35} />
          </button>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllProductSliceErrors,
  getAllProduct,
  resetProductSlice,
} from "../store/slice/productSlice";

export default function ItemDisplay() {
  const [current, setCurrent] = useState(0); // Índice atual do slide
  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? product.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === product.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProductSliceErrors());
    }
    if (message) {
      dispatch(resetProductSlice());
      dispatch(getAllProduct());
    }
  }, [dispatch, loading, error, message]);

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
          {product.map((item, index) => (
            <CarouselItem
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              images={item.images[0].path}
              price={item.price}
              mark={item.mark}
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

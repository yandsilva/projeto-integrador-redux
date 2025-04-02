import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdCard } from "react-icons/io";
import { LiaCartPlusSolid } from "react-icons/lia";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllProductSliceErrors,
  resetProductSlice,
} from "../store/slice/productSlice";
import { addItemToCart } from "../store/slice/cartItemsSlice";

export default function Product() {
  const { productId } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [userId, setUserId] = useState(null);
  const [productCart, setProductCart] = useState(null);
  const { product, error, loading, message } = useSelector(
    (state) => state.product,
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const productData = product.find((item) => item.id === productId);

  const handleAddToCart = () => {
    dispatch(addItemToCart(productId, userId));
  };

  useEffect(() => {
    setUserId(user.id);
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProductSliceErrors());
    }
    if (message) {
      dispatch(resetProductSlice());
    }
  }, [dispatch, error, message, loading]);

  return productData ? (
    <div>
      <Navbar />
      <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
        {/* Product Data */}
        <div className="flex flex-col gap-12 sm:flex-row sm:gap-7">
          {/* Product Images */}
          <div className="flex flex-1 flex-col-reverse sm:flex-row">
            <div className="relative">
              <img
                className="h-[550px] w-[600px] rounded-md bg-white object-contain p-2"
                src={`http://localhost:8000/images/${productData.images[0].path}`}
                alt=""
              />

              <button
                className="absolute top-2 right-2 flex w-fit items-center justify-center rounded-full border border-gray-400 p-2"
                onClick={() => setFavorite(!favorite)}
              >
                {!favorite ? (
                  <FaRegHeart size={20} color="red" />
                ) : (
                  <FaHeart size={20} color="red" />
                )}
              </button>
            </div>
          </div>

          {/* Product Info */}

          <div className="mr-4 flex-1 text-white">
            {/* Product Info */}
            <div>
              <h1 className="mb-2 text-3xl font-normal">
                {productData.description}
              </h1>
              <div className="mb-5">
                <div className="flex gap-2">
                  <p className="text-sm font-semibold">Marca:</p>
                  <span className="text-sm font-light">Gigabyte</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 border-t-[0.5px] border-[#535353]"></div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-[#009E2A]">
                  PRODUTO DISPONIVEL
                </div>
                <div className="flex gap-2">
                  <p className="text-sm font-semibold">SKU:</p>
                  <span className="text-sm font-light">MCR-RX5700-STK</span>
                </div>
              </div>
              <div className="mt-3 border-t-[0.5px] border-[#535353]"></div>
            </div>

            {/* Price */}
            <div>
              <div className="mt-10 flex items-center gap-4">
                <RiMoneyDollarBoxLine size={40} color="#009E2A" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-light text-[#009E2A]">à vista</p>
                  <p className="text-3xl font-semibold text-[#009E2A]">
                    R$ {productData.price}
                  </p>
                  <p className="text-xs font-light">no PIX com 15% desconto</p>
                </div>
              </div>
              <div className="my-4 w-10 border border-[#ff1515]"></div>
              <div className="flex items-center gap-4">
                <IoMdCard size={40} color="#ff1515" />
                <div className="flex flex-col gap-1">
                  <p className="text-3xl font-semibold text-[#ff1515]">
                    R$ {productData.price}
                  </p>
                  <p className="text-sm font-light">
                    em até <span className="text-[#ff1515]">12x</span> de{" "}
                    <span className="text-[#ff1515]">
                      R${productData.price}
                    </span>
                  </p>
                  <p className="text-sm font-light">sem juros no cartão</p>
                </div>
              </div>

              {/* Cart  */}
              <button
                onClick={handleAddToCart}
                className="my-10 flex h-20 w-full items-center justify-center gap-2 rounded-md bg-[#009E2A] duration-300 hover:bg-[#006E1D]"
              >
                <LiaCartPlusSolid size={55} />
                <div>
                  <p className="text-3xl font-bold">COMPRAR</p>
                  <p className="text-xs">COLOCAR NO CARRINHO</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* About */}

        <div className="my-20 flex flex-col justify-center gap-28 text-white">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="my-4 w-20 border border-[#ff1515]"></div>
            <p className="text-xl">SOBRE</p>
          </div>
          <div className="mx-10 flex gap-10">
            <div className="flex flex-1 flex-col justify-center gap-4">
              <p className="text-2xl font-semibold">
                PLACA DE VÍDEO MANCER RX 5700 8GB
              </p>
              <p className="text-justify text-lg">
                Para te levar as suas maiores conquistas, a Mancer trouxe a
                Placa de Vídeo RX 5700! Desenvolvida com performance ímpar em
                diversos jogos e programas, a Mancer Radeon RX 5700 fortalecerá
                suas próximas batalhas.
              </p>
            </div>
            <div className="flex-1">
              <img
                className="h-[550px] w-[600px] rounded-md bg-white object-contain p-2"
                src={`http://localhost:8000/images/${productData.images[0].path}`}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Addtional Infomation */}
        <div className="mx-10 mb-44 text-white">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="my-4 w-24 border border-[#ff1515]"></div>
            <p className="text-xl">INFORMAÇÕES ADICIONAIS</p>
          </div>

          <div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="flex-1 font-semibold">Marca:</p>
                <span className="flex-1 font-light">Mancer</span>
              </div>
              <div className="mb-2 border-t-[0.5px] border-[#535353]"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="flex-1 font-semibold">Modelo:</p>
                <span className="flex-1 font-light">MCR-RX5700-STK</span>
              </div>
              <div className="mb-2 border-t-[0.5px] border-[#535353]"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="flex-1 font-semibold">GPU:</p>
                <span className="flex-1 font-light">AMD Radeon RX 5700</span>
              </div>
              <div className="mb-2 border-t-[0.5px] border-[#535353]"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="flex-1 font-semibold">Interface:</p>
                <span className="flex-1 font-light">PCI Express x 16 4.0</span>
              </div>
              <div className="mb-2 border-t-[0.5px] border-[#535353]"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

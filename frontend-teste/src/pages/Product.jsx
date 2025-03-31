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

export default function Product() {
  const { productId } = useParams();
  const [favorite, setFavorite] = useState(false);
  const { product, error, loading, message } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const productData = product.find((item) => item.id === productId);
  console.log(productData);

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
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Data */}
        <div className="flex gap-12 sm:gap-7 flex-col sm:flex-row">
          {/* Product Images */}
          <div className="flex-1 flex flex-col-reverse sm:flex-row">
            {/* flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal items-center sm:w-[10%] w-full */}
            {/* <div className="flex sm:flex-col overflow-x-auto gap-y-2 justify-between sm:justify-normal items-center sm:w-[35%] w-full">
              {productData.map((item) => (
                <div
                  key={item.id}
                  className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 cursor-pointer bg-white p-2 rounded-md overflow-hidden"
                >
                  <img
                    src={`http://localhost:8000/images/${item.images[0].path}`}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div> */}
            <div className="relative">
              <img
                className="w-[600px] h-[550px] bg-white object-contain p-2 rounded-md"
                src={`http://localhost:8000/images/${productData.images[0].path}`}
                alt=""
              />

              <button
                className="flex items-center justify-center absolute right-2 top-2 rounded-full border border-gray-400 p-2 w-fit"
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

          <div className="flex-1 mr-4 text-white">
            {/* Product Info */}
            <div>
              <h1 className="font-normal text-3xl mb-2">
                {productData.description}
              </h1>
              <div className="mb-5">
                <div className="flex gap-2">
                  <p className="font-semibold text-sm">Marca:</p>
                  <span className="font-light text-sm">Gigabyte</span>
                </div>
              </div>
            </div>
            <div>
              <div className="border-t-[0.5px] border-[#535353] mb-3"></div>
              <div className="flex items-center justify-between">
                <div className="text-[#009E2A] font-medium text-sm">
                  PRODUTO DISPONIVEL
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold text-sm">SKU:</p>
                  <span className="font-light text-sm">MCR-RX5700-STK</span>
                </div>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mt-3"></div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-4 mt-10">
                <RiMoneyDollarBoxLine size={40} color="#009E2A" />
                <div className="flex flex-col gap-1">
                  <p className="text-[#009E2A] font-light text-xs">à vista</p>
                  <p className="text-[#009E2A] font-semibold text-3xl">
                    R$ {productData.price}
                  </p>
                  <p className="font-light text-xs">no PIX com 15% desconto</p>
                </div>
              </div>
              <div className="border border-[#ff1515] w-10 my-4"></div>
              <div className="flex items-center gap-4">
                <IoMdCard size={40} color="#ff1515" />
                <div className="flex flex-col gap-1">
                  <p className="text-[#ff1515] font-semibold text-3xl">
                    R$ {productData.price}
                  </p>
                  <p className="font-light text-sm">
                    em até <span className="text-[#ff1515]">12x</span> de{" "}
                    <span className="text-[#ff1515]">
                      R${productData.price}
                    </span>
                  </p>
                  <p className="font-light text-sm">sem juros no cartão</p>
                </div>
              </div>

              {/* Cart  */}
              <button className="flex items-center justify-center w-full h-20 rounded-md gap-2 bg-[#009E2A] hover:bg-[#006E1D] duration-300 my-10">
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

        <div className="flex flex-col justify-center gap-28 text-white my-20">
          <div className="text-white flex flex-col items-center gap-4">
            <div className="border border-[#ff1515] w-20 my-4"></div>
            <p className="text-xl">SOBRE</p>
          </div>
          <div className="flex gap-10 mx-10">
            <div className="flex-1 flex flex-col justify-center gap-4">
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
                className="w-[600px] h-[550px] bg-white object-contain p-2 rounded-md"
                src={`http://localhost:8000/images/${productData.images[0].path}`}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Addtional Infomation */}
        <div className="mb-44 mx-10 text-white">
          <div className="text-white flex flex-col items-center gap-4">
            <div className="border border-[#ff1515] w-24 my-4"></div>
            <p className="text-xl">INFORMAÇÕES ADICIONAIS</p>
          </div>

          <div>
            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">Marca:</p>
                <span className="flex-1 font-light">Mancer</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">Modelo:</p>
                <span className="flex-1 font-light">MCR-RX5700-STK</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">GPU:</p>
                <span className="flex-1 font-light">AMD Radeon RX 5700</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex ">
                <p className="flex-1 font-semibold">Interface:</p>
                <span className="flex-1 font-light">PCI Express x 16 4.0</span>
              </div>
              <div className="border-t-[0.5px] border-[#535353] mb-2"></div>
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

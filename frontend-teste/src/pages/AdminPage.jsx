import Navbar from "@/components/Navbar";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import AddProduct from "../components/AddProduct";
import Footer from "@/components/Footer";
import ViewProduct from "../components/ViewProduct";
import OrdersProduct from "../components/OrdersProduct";

export default function AdminPage() {
  const [active, setActive] = useState("AddProduct");

  return (
    <>
      <Navbar />
      <div>
        <div className="flex items-center gap-3 ml-16 mt-10 text-white">
          <CircleUserRound color="#E90313" size={60} />
          <div>
            <div className="text-4xl font-semibold">Olá, Yan</div>
            <div className="text-sm">
              Aqui você encontra todas as informações relacionadas a sua conta,
              como acompanhar seus últimos pedidos, adicionar novos endereços
              ...
            </div>
          </div>
        </div>
        <div className="border-2 border-[#E90313] min-w-fit mx-10 my-4"></div>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-4 text-white">
        <div
          onClick={() => setActive("AddProduct")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Minha Conta" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>ADICIONAR PRODUTO</p>
        </div>
        <div
          onClick={() => setActive("ViewProduct")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Minha Conta" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>LISTA PRODUTO</p>
        </div>
        <div
          onClick={() => setActive("OrdersProduct")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Minha Conta" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>ORDEM DE PEDIDOS</p>
        </div>
      </div>

      {(() => {
        switch (active) {
          case "AddProduct":
            return <AddProduct />;
          case "ViewProduct":
            return <ViewProduct />;
          case "OrdersProduct":
            return <OrdersProduct />;

          default:
            return <AddProduct />;
        }
      })()}
      <Footer />
    </>
  );
}

import { CircleUserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import EditData from "@/components/EditData";
import Orders from "@/components/Orders";
import AddressDisplay from "@/components/AddressDisplay";
import Favorites from "@/components/Favorites";

export default function Account() {
  const [active, setActive] = useState("Minha Conta");

  return (
    <div>
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
          onClick={() => setActive("Minha Conta")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Minha Conta" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>MINHA CONTA</p>
        </div>
        <div
          onClick={() => setActive("Meus Dados")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Meus Dados" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>MEUS DADOS</p>
        </div>
        <div
          onClick={() => setActive("Meus Pedidos")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Meus Pedidos" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>MEUS PEDIDOS</p>
        </div>
        <div
          onClick={() => setActive("Endereço")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Endereço" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>ENDEREÇO</p>
        </div>
        <div
          onClick={() => setActive("Favorito")}
          className={`flex items-center justify-center gap-2 bg-[#424242] w-[225px] py-8 rounded-md cursor-pointer ${
            active === "Favorito" ? "bg-[#2c2c2c]" : ""
          }`}
        >
          <CircleUserRound color="#E90313" size={25} />
          <p>FAVORITO</p>
        </div>
      </div>

      {(() => {
        switch (active) {
          case "Minha Conta":
            return <Dashboard />;
          case "Meus Dados":
            return <EditData />;
          case "Meus Pedidos":
            return <Orders />;
          case "Endereço":
            return <AddressDisplay />;
          case "Favorito":
            return <Favorites />;
          default:
            return <Dashboard />;
        }
      })()}
    </div>
  );
}

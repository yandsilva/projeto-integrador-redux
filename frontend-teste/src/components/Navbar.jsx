import pichau_logo from "@/assets/pichau_dark.png";
import {
  AlignJustify,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  Heart,
  Search,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  function openShowSidebar() {
    setShowSidebar(true);
  }
  function closeShowSidebar() {
    setShowSidebar(false);
  }

  return (
    <div className=" flex flex-col gap-2 px-4 py-2">
      <div className="flex justify-between items-center ">
        <a href="/">
          <img src={pichau_logo} width={215} alt="pichau_logo" />
        </a>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CircleUserRound color="#E90313" size={25} />
            <div className="text-white">
              <p className="text-[10px] ">MINHA CONTA</p>
              <Link to="/login" className="text-xs font-semibold">
                ENTRAR / CADASTRO
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleHelp color="#E90313" size={25} />
            <div className="text-white">
              <p className="text-[10px]">ATENDIMENTO</p>
              <p className="text-xs font-semibold">AO CLIENTE</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart color="#E90313" size={25} />
            <div className="text-white">
              <p className="text-[10px]">MEUS</p>
              <p className="text-xs font-semibold">FAVORITOS</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sun color="#E90313" size={25} />
            <div className="text-white">
              <p className="text-[10px]">MODO</p>
              <p className="text-xs font-semibold">CLARO</p>
            </div>
          </div>
          <div className="flex items-center bg-[#009E2A] py-3 px-4 rounded-md text-white ml-2 gap-2">
            <ShoppingCart />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">CARRINHO</p>
              <p className="text-xs text-end">0 produtos</p>
            </div>
            <ChevronDown />
          </div>
        </div>
      </div>

      {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={closeShowSidebar}
          ></div>

          <Sidebar closeShowSidebar={closeShowSidebar} />
        </>
      )}

      <div className="flex justify-between items-center gap-10">
        <div className="border-4 border-[#E90313] rounded-md w-fit">
          <button
            onClick={openShowSidebar}
            className="flex items-center bg-[#E90313] gap-5 px-14 py-1  hover:bg-[#A3020D] transition-all"
          >
            <AlignJustify color="white" size={35} />
            <div className="text-white">
              <p className="text-[12px] text-end">ACESSE TODOS OS</p>
              <p className="font-semibold text-xl">DEPARTAMENTOS</p>
            </div>
            <ChevronRight color="white" size={20} />
          </button>
        </div>
        <div className="flex items-center w-full justify-end bg-[#424242] rounded-sm">
          <input
            className="bg-transparent p-3 w-full text-white outline-none"
            type="text"
            placeholder="Digite o que você procura..."
          />
          <Search className="pr-2" color="white" />
        </div>
      </div>
    </div>
  );
}

import pichau_logo from "@/assets/pichau_dark.png";
import {
  AlignJustify,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  Heart,
  LogOut,
  Search,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "../store/slice/userSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout realizado com sucesso!");
  };

  function openShowSidebar() {
    setShowSidebar(true);
  }
  function closeShowSidebar() {
    setShowSidebar(false);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div className="flex items-center justify-between">
        <a href="/">
          <img src={pichau_logo} width={215} alt="pichau_logo" />
        </a>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="group relative text-white">
              <div className="flex items-center gap-2">
                <CircleUserRound color="#E90313" size={25} />
                <p className="text-white">Olà, {user.name}</p>
              </div>
              <div className="dropdown-menu absolute right-0 hidden pt-4 group-hover:block">
                <div className="flex w-36 flex-col gap-2 rounded bg-[#424242] px-5 py-3 text-white">
                  <a
                    href="/account"
                    className="cursor-pointer hover:text-[#E90313]"
                  >
                    Account
                  </a>
                  <a
                    href="/admin"
                    className="cursor-pointer hover:text-[#E90313]"
                  >
                    Admin
                  </a>
                  <button
                    onClick={handleLogout}
                    href="/admin"
                    className="flex cursor-pointer gap-1 hover:text-[#E90313]"
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CircleUserRound color="#E90313" size={25} />
              <div className="text-white">
                <p className="text-[10px]">MINHA CONTA</p>
                <Link to="/login" className="text-xs font-semibold">
                  ENTRAR / CADASTRO
                </Link>
              </div>
            </div>
          )}
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
          <a
            href="/cart"
            className="ml-2 flex cursor-pointer items-center gap-2 rounded-md bg-[#009E2A] px-4 py-3 text-white hover:bg-[#006E1D]"
          >
            <ShoppingCart />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">CARRINHO</p>
              <p className="text-end text-xs">{cartItems.length} produtos</p>
            </div>
            <ChevronDown />
          </a>
        </div>
      </div>

      {showSidebar && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black opacity-50"
            onClick={closeShowSidebar}
          ></div>

          <Sidebar closeShowSidebar={closeShowSidebar} />
        </>
      )}

      <div className="flex items-center justify-between gap-10">
        <div className="w-fit rounded-md border-4 border-[#E90313]">
          <button
            onClick={openShowSidebar}
            className="flex items-center gap-5 bg-[#E90313] px-14 py-1 transition-all hover:bg-[#A3020D]"
          >
            <AlignJustify color="white" size={35} />
            <div className="text-white">
              <p className="text-end text-[12px]">ACESSE TODOS OS</p>
              <p className="text-xl font-semibold">DEPARTAMENTOS</p>
            </div>
            <ChevronRight color="white" size={20} />
          </button>
        </div>
        <div className="flex w-full items-center justify-end rounded-sm bg-[#424242]">
          <input
            className="w-full bg-transparent p-3 text-white outline-none"
            type="text"
            placeholder="Digite o que você procura..."
          />
          <Search className="pr-2" color="white" />
        </div>
      </div>
    </div>
  );
}

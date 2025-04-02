import pichau_logo from "@/assets/pichau_dark.png";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function NavbarCart() {
  return (
    <div className="flex items-center justify-between text-white">
      <Link to="/">
        <img className="w-[200px]" src={pichau_logo} alt="" />
      </Link>
      <div>
        <h2 className="text-4xl font-semibold">Meu Carrinho</h2>
      </div>
      <div className="rounded-full p-3 transition-all hover:bg-[#404040]">
        <ShoppingCart size={30} />
      </div>
    </div>
  );
}

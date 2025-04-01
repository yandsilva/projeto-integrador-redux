import pichau_logo from "@/assets/pichau_dark.png";
import { ShoppingCart } from "lucide-react";

export default function NavbarCart() {
  return (
    <div className="flex items-center justify-between text-white">
      <img className="w-[200px]" src={pichau_logo} alt="" />
      <div>
        <h2 className="text-4xl font-semibold">Meu Carrinho</h2>
      </div>
      <div className="hover:bg-[#404040] transition-all rounded-full p-3">
        <ShoppingCart size={30} />
      </div>
    </div>
  );
}

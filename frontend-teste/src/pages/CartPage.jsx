import CartItems from "../components/CartItems";
import NavbarCart from "../components/NavbarCart";
import { ChevronLeft, ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-4">
      <div>
        <NavbarCart />
      </div>
      <a href="/" className="flex items-center gap-2 text-white">
        <ChevronLeft />
        <p>Voltar para a Página Inicial</p>
      </a>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 text-white">
          <ShoppingCart size={35} color="red" />
          <p className="text-3xl">MEU CARRINHO</p>
        </div>
        <div className="flex gap-5">
          <CartItems />
          <div className="bg-white flex-1">asdfadfasdf</div>
        </div>
      </div>
    </div>
  );
}

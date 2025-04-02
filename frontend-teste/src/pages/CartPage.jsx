import CartItemsDisplay from "../components/CartItemsDisplay";
import NavbarCart from "../components/NavbarCart";
import Footer from "../components/Footer";
import { ChevronLeft, ShoppingCart, Ticket, Trash, Truck } from "lucide-react";

export default function CartPage() {
  return (
    <>
      <div className="mb-20 flex flex-col gap-10 px-6 py-4">
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
            <CartItemsDisplay />
            <div className="flex-1 bg-[#4C4C4C] text-white">
              <div className="my-4 text-center text-2xl">Resumo</div>
              <div className="h-[1px] w-full bg-white/10"></div>
              <div className="flex justify-between px-6 py-5">
                <p>Subtotal</p>
                <p>
                  R$ <span>1.247,04</span>
                </p>
              </div>
              <div className="flex justify-between bg-[#616161] px-6 py-5">
                <p className="text-xl">Total</p>
                <p className="text-xl">
                  R$ <span>1.247,04</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-7/9 justify-end">
            <div className="flex w-fit cursor-pointer items-center gap-1 rounded-md bg-red-600 px-2 py-2 text-white transition-all hover:bg-[#A3020D]">
              <Trash size={15} />
              <p className="text-sm">LIMPAR CARRINHO</p>
            </div>
          </div>
          <div className="flex gap-5 text-white">
            <div className="flex w-7/9 justify-between">
              <div className="flex w-fit flex-col gap-5 rounded-md bg-[#616161] px-6 py-5">
                <p className="text-2xl">Cupom de desconto:</p>
                <div className="flex items-center gap-4">
                  <div className="w-72 rounded-md border">
                    <input
                      className="w-full p-2 outline-none"
                      type="text"
                      placeholder="Cupom de desconto"
                    />
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-2 py-2 text-white transition-all hover:bg-[#A3020D]">
                    <Ticket size={20} />
                    <p>APLICAR</p>
                  </div>
                </div>
              </div>
              <div className="flex w-fit flex-col gap-5 rounded-md bg-[#616161] px-6 py-5">
                <p className="text-2xl">Frete e Prazos</p>
                <div className="flex items-center gap-4">
                  <div className="w-72 rounded-md border">
                    <input
                      className="w-full p-2 outline-none"
                      type="text"
                      placeholder="CEP*"
                    />
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-2 py-2 text-white transition-all hover:bg-[#A3020D]">
                    <Truck size={20} />
                    <p>APLICAR</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center gap-5 rounded-sm bg-[#009E2A] py-6 transition-all hover:bg-[#006E1D]">
                <ShoppingCart size={30} />
                <p className="text-lg">FINALIZAR PEDIDO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

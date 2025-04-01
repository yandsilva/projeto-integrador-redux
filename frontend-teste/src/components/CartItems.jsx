import banner_account from "../assets/banner_account.jpg";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function CartItems() {
  const { cartItems } = useSelector((state) => state.cartItems);
  console.log(cartItems);

  return (
    <div className="bg-[#4C4C4C] rounded-sm w-7/9">
      <div className="">
        <div className="grid gap-2 grid-cols-[3fr_1fr_1.5fr_0.2fr] px-4 py-5 text-white">
          <div>Produto</div>
          <div>Qtdd</div>
          <div>Preço à Vista no PIX</div>
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className=" grid gap-2 grid-cols-[3fr_1fr_1.5fr_0.2fr] px-4 py-5 text-white">
          <div className="flex gap-6">
            <img className="w-[120px]" src={banner_account} alt="" />
            <div className="flex flex-col justify-between gap-4">
              <p>descrição</p>
              <p>descrição</p>
            </div>
          </div>
          <div className="flex items-center">Qtdd</div>
          <div className="flex items-center">Preço à Vista no PIX</div>
          <div
            className="flex items-center cursor-pointer hover:bg-white/10 
            transition-all rounded-full p-3"
          >
            <Trash2 />
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
      </div>
    </div>
  );
}

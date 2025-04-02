import { useSelector } from "react-redux";
import CartItems from "./CartItems";

export default function CartItemsDisplay() {
  const { cartItems } = useSelector((state) => state.cartItems);

  return (
    <div className="w-7/9 rounded-sm bg-[#4C4C4C]">
      <div className="">
        <div className="grid grid-cols-[3fr_1fr_1.5fr_0.2fr] gap-2 px-4 py-5 text-white">
          <div>Produto</div>
          <div>Qtdd</div>
          <div>Preço à Vista no PIX</div>
        </div>
        <div className="h-[1px] w-full bg-white/10"></div>
        <div className="grid grid-cols-[3fr_1fr_1.5fr_0.2fr] gap-2 px-4 py-5 text-white">
          {cartItems.map((item) => (
            <CartItems
              key={item.product.id}
              id={item.product.id}
              description={item.product.description}
              mark={item.product.mark}
              name={item.product.name}
              price={item.product.price}
              images={item.product.images[0].path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

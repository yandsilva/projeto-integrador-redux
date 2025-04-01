import { useSelector } from "react-redux";
import CartItems from "./CartItems";

export default function CartItemsDisplay() {
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
        <div className="grid gap-2 grid-cols-[3fr_1fr_1.5fr_0.2fr] px-4 py-5 text-white">
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

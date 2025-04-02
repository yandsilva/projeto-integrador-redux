import { Trash2 } from "lucide-react";

export default function CartItems({
  description,
  id,
  mark,
  name,
  price,
  images,
}) {
  return (
    <>
      <div className="flex gap-6">
        <img
          className="w-[120px]"
          src={`http://localhost:8000/images/${images}`}
          alt=""
        />
        <div className="flex flex-col justify-between gap-4">
          <p>{description}</p>
        </div>
      </div>
      <div className="flex items-center">{price}</div>
      <div className="flex items-center">{price}</div>
      <div className="flex cursor-pointer items-center rounded-full p-3 transition-all hover:bg-white/10">
        <Trash2 />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { productsAssets } from "../assets/assets";
import ProductItem from "./ProductItem";

export default function ItemDisplay() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(productsAssets);
  }, []);

  return (
    <>
      <div className="m-10 mt-20 text-white">
        <h2 className="text-3xl">Ofertas em Destaque</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6 w-[85vw] mb-36 m-auto">
        {product.map((item, index) => (
          <ProductItem
            key={index}
            description={item.description}
            image={item.image[0]}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
}

import { useState } from "react";

export default function AddProduct() {
  const [image, setImage] = useState(null);

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className="flex flex-col  gap-4 mt-16 mb-20">
      <div className="flex flex-col gap-10 justify-center items-center">
        <label className="text-sm font-medium text-white">
          IMAGEM DO PRODUTO
        </label>
        <img
          src={image ? `${image}` : `./vite.svg`}
          alt="avatar"
          className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
        />
        <input
          type="file"
          className="avatar-update-btn text-sm"
          onChange={avatarHandler}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center">
          <label className="text-xl text-white font-medium">
            Nome do Produto
          </label>
          <div className="flex items-center w-1/3 justify-center bg-[#424242] rounded-sm">
            <input
              className="bg-transparent p-3 w-full text-white outline-none"
              type="text"
              placeholder="Nome do Produto"
            />
          </div>
        </div>
        <div className="flex justify-center gap-12 items-center">
          <div>
            <label className="text-xl text-white font-medium">
              Marca do Produto
            </label>
            <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
              <input
                className="bg-transparent p-3 w-full text-white outline-none"
                type="text"
                placeholder="Marca do Produto"
              />
            </div>
          </div>
          <div>
            <label className="text-xl text-white font-medium">
              Preço do Produto
            </label>
            <div className="flex items-center w-full justify-center bg-[#424242] rounded-sm">
              <input
                className="bg-transparent p-3 w-full text-white outline-none"
                type="number"
                placeholder="Preço do Produto"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xl text-white font-medium">
            Nome do Produto
          </label>
          <div className="flex items-center w-1/3 justify-center bg-[#424242] rounded-sm">
            <textarea
              className="bg-transparent p-3 w-full h-60 text-white outline-none"
              placeholder="Nome do Produto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarouselItem({ description, price, images, id }) {
  return (
    <a
      href={`/product/${id}`}
      className="bg-[#1E1E1E] p-2 cursor-pointer w-[17%] flex-none rounded-md hover:shadow-[0px_0px_15px_rgba(255,0,0,1)] transition-all duration-200"
    >
      <img
        className="w-full"
        src={`http://localhost:8000/images/${images}`}
        alt=""
      />
      <div className="flex flex-col gap-4 mt-4">
        <p
          title={description}
          //
          className="text-sm text-white line-clamp-2"
          //line-clamp Limita o texto a no máximo 2 linhas, Disponível no plugin "npm i @tailwindcss/line-clamp"
          //Caso o line-clamp ainda não esteja habilitado no seu projeto, adicione o plugin no arquivo tailwind.config.ts/js:
          //plugins: [require('@tailwindcss/line-clamp')],
        >
          {description}
        </p>
        <div>
          <div className="text-sm text-gray-400">
            <span className="text-2xl font-bold text-green-500">
              R$ {price}
            </span>{" "}
            no Pix
            <span className="block text-gray-400 mt-1">
              ou por 10x R$ 290,68
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

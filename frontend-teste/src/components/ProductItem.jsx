export default function ProductItem({ description, price, image }) {
  return (
    <div className="text-gray-700 cursor-pointer p-2 bg-[#1E1E1E]">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image}
          alt=""
        />
      </div>
      <p
        title={description}
        //
        className="text-sm mb-5 text-white line-clamp-2"
        //line-clamp Limita o texto a no máximo 2 linhas, Disponível no plugin "npm i @tailwindcss/line-clamp"
        //Caso o line-clamp ainda não esteja habilitado no seu projeto, adicione o plugin no arquivo tailwind.config.ts/js:
        //plugins: [require('@tailwindcss/line-clamp')],
      >
        {description}
      </p>
      <div>
        <div className="text-sm text-gray-400">
          <span className="text-2xl font-bold text-green-500">R$ {price}</span>{" "}
          no Pix
          <span className="block text-gray-400 mt-1">ou por 10x R$ 290,68</span>
        </div>
      </div>
    </div>
  );
}

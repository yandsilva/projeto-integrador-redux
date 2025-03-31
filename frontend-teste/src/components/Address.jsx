export default function Address({
  street,
  neighborhood,
  number,
  city,
  state,
  zip,
  handleDeleteAddress,
}) {
  return (
    <div className="flex flex-col gap-2 mt-20 border border-[#E90313] bg-[#2c2c2c] rounded-md py-4 w-fit">
      <div>
        <p className="text-center font-semibold">ENDEREÇO DE ENTREGA PADRÃO</p>
      </div>
      <div className="border border-[#414141] w-80"></div>
      <div className="ml-4">
        <p>Yan Silva</p>
        <p>{street}</p>
        <div className="flex">
          <p>{neighborhood}</p>, <p>{number}</p>
        </div>
        <div className="flex">
          <p>{city}</p>, <p>{state}</p>, <p>{zip}</p>
        </div>
        <p>Telefone</p>
      </div>
      <button
        onClick={handleDeleteAddress}
        className="flex justify-center items-center"
      >
        <div className="text-[#E90313] w-fit hover:bg-[#E90313]/50 rounded-md py-1 px-2 cursor-pointer">
          Remover
        </div>
      </button>
    </div>
  );
}

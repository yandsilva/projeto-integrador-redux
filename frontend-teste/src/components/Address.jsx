export default function Address() {
  return (
    <div className="flex flex-col gap-2 mt-20 border border-[#E90313] bg-[#2c2c2c] rounded-md py-4 w-fit">
      <div>
        <p className="text-center font-semibold">ENDEREÇO DE ENTREGA PADRÃO</p>
      </div>
      <div className="border border-[#414141] w-80"></div>
      <div className="ml-4">
        <p>Yan Silva</p>
        <p>Rua Teste</p>
        <div className="flex">
          <p>Bairro</p>
          <p>Numero</p>
        </div>
        <div className="flex">
          <p>Cidade</p>
          <p>Estado</p>
          <p>CEP</p>
        </div>
        <p>Telefone</p>
      </div>
    </div>
  );
}

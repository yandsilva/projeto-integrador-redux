import { MapPin } from "lucide-react";
import React from "react";
import Address from "./Address";

export default function AddressDisplay() {
  return (
    <div className="text-white w-[75%] mt-10 m-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MapPin color="#E90313" size={30} />
            <p className="text-2xl">Endereços Cadastrados</p>
          </div>
          <div className="border border-[#E90313] w-32 mt-2"></div>
        </div>
        <button className="text-xl font-extralight bg-[#009E2A] rounded-md py-1 px-2 cursor-pointer">
          Adicionar Novo Endereço
        </button>
      </div>
      {<Address />}
    </div>
  );
}

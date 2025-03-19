import { Clock, Mail, PhoneCall } from "lucide-react";

export default function InfoFooter() {
  return (
    <div className="relative">
      <div className="bg-[#3A3A3D] w-[85%] mx-auto p-5 text-white rounded-md flex items-center justify-around right-0 left-0 -top-20 absolute">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full">
            <Clock size={30} color="red" />
          </div>
          <div>
            <p className="font-semibold">Atendimento Loja Virtual</p>
            <p>
              Segunda a sexta <span className="font-semibold"> 8h às 12h</span>{" "}
              e das <span className="font-semibold"> 14h às 18h</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full">
            <PhoneCall size={30} color="red" />
          </div>
          <div>
            <p className="font-semibold">(14) 99999-9999</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full">
            <Mail size={30} color="red" />
          </div>
          <div>
            <p className="font-semibold">sac@nomedosite.com.br</p>
          </div>
        </div>
      </div>
    </div>
  );
}

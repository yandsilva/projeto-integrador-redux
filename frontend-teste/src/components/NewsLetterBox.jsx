import { MoveRight } from "lucide-react";
import { IoLogoFacebook, IoLogoTwitter, IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import applestore from "../assets/applestore.svg";
import playstore from "../assets/playstore.svg";

export default function NewsLetterBox() {
  const handleNewsLetter = () => {
    console.log();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[#E90313] font-semibold">NEWSLETTER</p>
      <div className="bg-[#E90313] h-[3px] w-4 rounded-sm" />

      <form onSubmit={handleNewsLetter}>
        <div className="flex bg-white items-center justify-evenly gap-2 w-96 px-3 py-4">
          <input
            className="w-full py-2 outline-none text-black"
            type="email"
            placeholder="E-mail"
          />
          <button>
            <MoveRight className="text-[#E90313] " size={29} />
          </button>
        </div>
      </form>

      {/* REDES SOCIAIS */}

      <div className="flex items-center justify-end gap-2">
        <p className="text-sm">Siga-nos nas redes sociais</p>
        <div className="flex gap-2">
          <a href="#" className="bg-white p-2 rounded-full w-fit">
            <IoLogoFacebook size={20} color="#E90313" />
          </a>
          <a href="#" className="bg-white p-2 rounded-full w-fit">
            <FaInstagram size={20} color="#E90313" />
          </a>
          <a href="#" className="bg-white p-2 rounded-full w-fit">
            <IoLogoTwitter size={20} color="#E90313" />
          </a>
          <a href="#" className="bg-white p-2 rounded-full w-fit">
            <IoLogoYoutube size={20} color="#E90313" />
          </a>
        </div>
      </div>

      {/* BAIXE OS APLICATIVOS */}

      <div className="flex flex-col gap-4">
        <p className="text-[#E90313] font-semibold">BAIXE OS APLICATIVOS</p>
        <div className="bg-[#E90313] h-[3px] w-4 rounded-sm" />

        <div className="flex items-center gap-3">
          <a href="#">
            <img src={applestore} alt="" />
          </a>
          <a href="#">
            <img src={playstore} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

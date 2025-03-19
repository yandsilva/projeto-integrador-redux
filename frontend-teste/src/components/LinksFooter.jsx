import card_visa from "../assets/card_visa.png";
import boleto from "../assets/boleto.png";
import pix from "../assets/pix.png";
import NewsLetterBox from "./NewsLetterBox";

export default function LinksFooter() {
  return (
    <div className="text-white flex items-start justify-evenly">
      <div className="flex flex-col gap-4">
        <p className="text-[#E90313]  font-semibold">DÚVIDAS</p>
        <div className="bg-[#E90313] h-[3px] w-4 rounded-sm" />
        <ul className="flex flex-col gap-1">
          <li className="hover:underline">
            <a href="#">Entrega</a>
          </li>
          <li className="hover:underline">
            <a href="#">Garantia</a>
          </li>
          <li className="hover:underline">
            <a href="#">Como Comprar</a>
          </li>
          <li className="hover:underline">
            <a href="#">Formas de Pagamento</a>
          </li>
          <li className="hover:underline">
            <a href="#">Sobre Boletos</a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[#E90313] font-semibold">AJUDA</p>
        <div className="bg-[#E90313] h-[3px] w-4 rounded-sm" />
        <ul className="flex flex-col gap-1">
          <li className="hover:underline">
            <a href=""> SAC</a>
          </li>
          <li className="hover:underline">
            <a href=""> Fale Conosco</a>
          </li>
          <li className="hover:underline">
            <a href=""> Termos de Aceite</a>
          </li>
          <li className="hover:underline">
            <a href=""> Políticas de Privacidade</a>
          </li>
          <li className="hover:underline">
            <a href=""> Quem Somos</a>
          </li>
        </ul>
      </div>

      {/* PAYMENT */}

      <div className="flex flex-col gap-4">
        <p className="text-[#E90313] font-semibold">PAGAMENTOS</p>
        <div className="bg-[#E90313] h-[3px] w-4 rounded-sm" />
        <div className="flex flex-col gap-3">
          <div className="bg-white flex items-center justify-center rounded-md">
            <img className="w-16" src={card_visa} alt="" />
          </div>
          <div className="bg-white flex items-center justify-center py-2 rounded-md">
            <img className="w-16" src={boleto} alt="" />
          </div>
          <div className="bg-white flex items-center justify-center py-4 rounded-md">
            <img className="w-16" src={pix} alt="" />
          </div>
        </div>
      </div>

      {/* NewsLetterBox */}

      <NewsLetterBox />
    </div>
  );
}

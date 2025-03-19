import { BookUser, CircleUserRound, Info, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function SidebarConfiguration() {
  const SidebarConfig = {
    "Minha Conta": { path: "/minha-conta" },
    "Quem Somos": { path: "/quem-somos" },
    "Atendimento ao Cliente": { path: "/atendimento-ao-cliente" },
    "Como Comprar": { path: "/como-comprar" },
  };

  const SidebarIcon = {
    "Minha Conta": <CircleUserRound size={20} className="text-[#b9b9b9]" />,
    "Quem Somos": <Info size={20} className="text-[#b9b9b9]" />,
    "Atendimento ao Cliente": <BookUser size={20} className="text-[#b9b9b9]" />,
    "Como Comprar": <ShoppingCart size={20} className="text-[#b9b9b9]" />,
  };

  return (
    <div className="mb-5">
      <div className="text-white text-sm mx-6 mt-5 mb-2">CATEGORIAS</div>
      <div className="text-white">
        {Object.keys(SidebarIcon).map((key) => (
          <Link
            key={key}
            to={SidebarConfig[key]?.path || "#"}
            className="flex items-center gap-2 text-white px-6 py-3 hover:bg-[#2e2e2e] rounded-md"
          >
            {SidebarIcon[key]}
            <span>{key}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

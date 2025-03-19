import pichau_logo from "@/assets/pichau_dark.png";
import {
  ChartBarIncreasing,
  ChevronDown,
  ChevronUp,
  Computer,
  Cpu,
  Laptop,
  Monitor,
  MousePointerClick,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarConfiguration } from "./SidebarConfiguration";

export default function Sidebar({ closeShowSidebar }) {
  const [openCategory, setOpencategory] = useState({
    Hardware: false,
    Periférico: false,
    Computadores: false,
    Monitores: false,
    "Cadeiras e Mesas Gamer": false,
    "Notebooks e Portáteis": false,
  });

  const categoryIcons = {
    Hardware: <Cpu size={20} className="text-[#b9b9b9]" />,
    Periférico: <MousePointerClick size={20} className="text-[#b9b9b9]" />,
    Computadores: <Computer size={20} className="text-[#b9b9b9]" />,
    Monitores: <Monitor size={20} className="text-[#b9b9b9]" />,
    "Cadeiras e Mesas Gamer": (
      <ChartBarIncreasing size={20} className="text-[#b9b9b9]" />
    ),
    "Notebooks e Portáteis": <Laptop size={20} className="text-[#b9b9b9]" />,
  };

  const categorySubItems = {
    Hardware: [
      { name: "Placas de video", path: "/hardware/placas-de-video" },
      { name: "Processadores", path: "/hardware/processadores" },
      { name: "Memórias Ram", path: "/hardware/memorias-ram" },
      { name: "Placas-mãe", path: "/hardware/placa-mae" },
    ],
    Periférico: [
      { name: "Teclados", path: "/perifericos/teclados" },
      { name: "Mouses", path: "/perifericos/mouses" },
      { name: "Headsets", path: "/perifericos/headsets" },
      { name: "Webcams", path: "/perifericos/webcams" },
    ],
    Computadores: [
      { name: "Desktops", path: "/computadores/desktops" },
      { name: "Workstations", path: "/computadores/workstations" },
      { name: "All-in-One", path: "/computadores/all-in-one" },
    ],
    Monitores: [
      { name: "Full HD", path: "/monitores/full-hd" },
      { name: "4K", path: "/monitores/4k" },
      { name: "Ultrawide", path: "/monitores/ultrawide" },
      {
        name: "Taxa de Atualização 144Hz+",
        path: "/monitores/taxa-atualizacao",
      },
    ],
    "Cadeiras e Mesas Gamer": [
      { name: "Cadeiras", path: "/cadeiras-mesas-gamer/cadeiras" },
      { name: "Mesas", path: "/cadeiras-mesas-gamer/mesas" },
      { name: "Acessórios", path: "/cadeiras-mesas-gamer/acessorios" },
    ],
    "Notebooks e Portáteis": [
      { name: "Notebook", path: "/notebooks-portateis/notebooks" },
      { name: "Tablets", path: "/notebooks-portateis/tablets" },
      { name: "Chromebooks", path: "/notebooks-portateis/chromebooks" },
    ],
  };

  const toggleCategory = (category) => {
    setOpencategory((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const siderbarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40  overflow-y-auto bg-[#424242]
    w-80 mx-[-20px] my-[-16px] 
  `;

  return (
    <div className={siderbarClassNames}>
      <div>
        <div className="z-50 flex min-h-[56px] w-full items-center justify-between px-6 pt-3">
          <img className="w-[70%]" src={pichau_logo} alt="" />
          <div
            onClick={closeShowSidebar}
            className="p-2 rounded-full cursor-pointer hover:bg-[#515151] transition duration-300 ease-in-out"
          >
            <X className="text-white" size={35} />
          </div>
        </div>

        <div className="text-white text-sm mx-6 mt-10 mb-2">CATEGORIAS</div>

        {Object.keys(openCategory).map((category) => (
          <div key={category} className="hover:bg-[#2e2e2e]">
            <button
              className="text-white flex w-full items-center justify-between px-6 py-3"
              onClick={() => toggleCategory(category)}
            >
              <div className="flex gap-2">
                {categoryIcons[category]}
                <span>{category}</span>
              </div>
              {openCategory[category] ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Sub-Items */}

            {openCategory[category] && categorySubItems[category] && (
              <div className="pl-12 pr-6 py-2 text-[#b9b9b9]">
                {categorySubItems[category]?.map((subItem) => (
                  <Link
                    className="py-1 flex flex-col hover:text-white hover:bg-[#2e2e2e] cursor-pointer rounded-md px-2"
                    key={subItem.path}
                    to={subItem.path}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <SidebarConfiguration />
    </div>
  );
}

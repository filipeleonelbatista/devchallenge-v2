import FooterSite from "@/components/FooterSite";
import HeaderSite from "@/components/HeaderSite";

import { FaCodeBranch } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";

export function Community() {
  return (
    <>
      <HeaderSite />
      <div className="container mx-auto p-4 flex flex-col">
        <div className="py-24 items-center justify-center flex flex-row flex-wrap gap-4">
          <div className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center">
            <GoLightBulb className="w-12 h-12 text-yellow-400" />
            <p className="text-center font-bold">Enviar novo desafio</p>
          </div>
          <div className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center">
            <FiMessageCircle className="w-12 h-12 text-yellow-400" />
            <p className="text-center font-bold">Participar da comunidade</p>
          </div>
          <div className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center">
            <FaCodeBranch className="w-12 h-12 text-yellow-400" />
            <p className="text-center font-bold">Contribuir open source</p>
          </div>
        </div>
      </div>
      <FooterSite />
    </>
  );
}

import FooterSite from "@/components/FooterSite";
import HeaderSite from "@/components/HeaderSite";
import { Button } from "@/components/ui/button";
import { FaCheck, FaGithub, FaLinkedin } from "react-icons/fa";

export function Detail() {
  const includes = [
    {
      id: 1,
      instruction:
        "Readme com instruções de requisitos e as rotas da aplicação",
    },
    {
      id: 2,
      instruction: "Imagens para adicionar no projeto",
    },
    {
      id: 3,
      instruction: "Modelo como design para utilizar como referência",
    },
    {
      id: 4,
      instruction: "Arquivo contendo o texto que será utilizado",
    },
  ];

  const starts = [
    {
      id: 1,
      steps: "Clone o projeto com o código inicial",
    },
    {
      id: 2,
      steps: "Leia as instruções disponíveis no readme",
    },
    {
      id: 3,
      steps: "Inicie o desenvolvimento!",
    },
    {
      id: 4,
      steps: "Compartilhe seus resultados com a comunidade",
    },
  ];

  return (
    <>
      <HeaderSite />
      <div className="container mx-auto p-4 flex flex-col">
        <div className="flex flex-row md:flex-column gap-4 px-4 py-10">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-4xl text-yellow-400 font-bold">Titulo</h2>

            <div className="flex flex-row gap-2">
              <div className="px-4 py-0.5 text-sm font-bold bg-pink-500 flex items-center justify-center rounded-full">
                Tech
              </div>
              <div className="px-4 py-0.5 text-sm font-bold bg-orange-400 flex items-center justify-center rounded-full">
                Intermediario
              </div>
              <div className="px-4 py-0.5 text-sm font-bold bg-gray-500 flex items-center justify-center rounded-full">
                React Native
              </div>
              <div className="px-4 py-0.5 text-sm font-bold bg-gray-500 flex items-center justify-center rounded-full">
                React JS
              </div>
            </div>

            <p className="text-sm text-white">
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <Button
              size="lg"
              className="w-full bg-purple-800 text-white hover:bg-purple-500 rounded-full"
            >
              Começar
            </Button>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <img
              className="w-full h-full rounded object-cover"
              src="https://github.com/filipeleonelbatista.png"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-10">
          <h3 className="text-2xl text-purple-600 font-bold">
            Sobre o desafio
          </h3>

          <p className="text-sm text-white">Seu desafio é.</p>

          <div className="flex flex-row md:flex-column gap-4 py-8">
            <div className="flex flex-1 flex-col gap-2">
              <h4 className="text-2xl text-purple-600 font-bold">
                O Que está incluso?
              </h4>

              {"" === "Backend" ? (
                <span>
                  Readme com instruções de requisitos e as rotas da aplicação
                </span>
              ) : (
                <>
                  {includes.map((include) => (
                    <span key={include.id} className="flex gap-4 items-center">
                      <FaCheck className="w-4 h-4 text-yellow-400" />
                      {include.instruction}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h4 className="text-2xl text-purple-600 font-bold">
                Como Iniciar?
              </h4>
              {starts.map((start) => (
                <p key={start.id}>
                  <span className="text-lg text-yellow-400 font-bold">
                    {start.id} -{" "}
                  </span>
                  {start.steps}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center py-8">
          <div className="flex flex-row p-4 bg-gray-800 rounded w-96 items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
              <img
                src="https://github.com/filipeleonelbatista.png"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-md text-white">filipeleonelbatista</p>

                <p className="text-sm text-yellow-400">Desenvolvedor</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <a>
                <FaGithub className="w-7 h-7 mr-2 text-white hover:text-yellow-400" />
              </a>

              <a>
                <FaLinkedin className="w-7 h-7 mr-2 text-white hover:text-yellow-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <FooterSite />
    </>
  );
}

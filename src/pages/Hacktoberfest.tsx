import HacktoberfestLogo from "@/assets/hacktoberfest/hacktoberfest-logo.png";
import HacktoberfestIcon from "@/assets/hacktoberfest/icon.png";
import DiscordAnimation from "@/assets/animations/discord.json";
import FooterSite from "@/components/FooterSite";
import HeaderSite from "@/components/HeaderSite";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useChallenges } from "@/hooks/useChallenges";
import { addEmailIntoNewsletter } from "@/utils/NewsLetterFunctions";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import { Input } from "@/components/ui/input";

import { AiOutlineCode } from "react-icons/ai";
import { IoShirtOutline } from "react-icons/io5";
import { SlScreenDesktop } from "react-icons/sl";

export function Hacktoberfest() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  async function handleSubscribe(e: any) {
    e.preventDefault();

    try {
      const response = await addEmailIntoNewsletter(email);
      if (response) {
        alert("Feito! Você será o primeiro a saber sobre novos desafios :)");
        setEmail("");
      }
    } catch (err) {
      alert("Opa, algo deu errado! Pode tentar novamente? :c");
    }
  }

  const { challengesList } = useChallenges();

  const [languageFilter, setLanguageFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredChallenges = useMemo(() => {
    const activeOnly = challengesList.filter(
      (item) => item.active && item.isHacktoberfest
    );

    const languageFiltered =
      languageFilter === ""
        ? activeOnly
        : activeOnly.filter((item) => item.techs.includes(languageFilter));

    const typeFiltered =
      typeFilter === ""
        ? languageFiltered
        : languageFiltered.filter((item) => item.type === typeFilter);

    return typeFiltered;
  }, [challengesList, languageFilter, typeFilter]);

  useEffect(() => {
    if (location.search.includes("?type=")) {
      const queryTypeParam = location.search.replace("?type=", "");
      setTypeFilter(queryTypeParam);
    }
  }, [location]);

  const colorMatch = (option: string) => {
    switch (option) {
      case "Iniciante":
        return "bg-green-600";
      case "Intermediário":
        return "bg-orange-600";
      case "Avançado":
        return "bg-red-600";
      case "Mobile":
        return "bg-pink-600";
      case "Front-end":
        return "bg-cyan-600";
      case "Back-end":
        return "bg-purple-600";
      default:
        return "bg-indigo-600";
    }
  };

  return (
    <>
      <HeaderSite />
      <div className="container mx-auto p-4 flex flex-col">
        <div className="py-16 items-center justify-center flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl text-center font-bold leading-relaxed typewriter">
              Junte-se ao{" "}
              <a
                href="https://hacktoberfest.com/"
                target="_blank"
                rel="nofollow noreferer noopener"
                className="font-bold uppercase hacktoberfont"
              >
                Hacktoberfest
              </a>{" "}
              e{" "}
            </h2>
            <h2 className="text-3xl text-center font-bold leading-relaxed typewriter">
              Fortaleça Sua Jornada no{" "}
              <a
                href="https://discord.gg/yvYXhGj"
                target="_blank"
                rel="nofollow noreferer noopener"
              >
                <b>
                  <span className="text-yellow-400">Dev</span>Challenge
                </b>
              </a>
              !
            </h2>
          </div>
          <p className="text-white max-w-2xl mt-10 text-center">
            O{" "}
            <a
              href="https://hacktoberfest.com/"
              target="_blank"
              rel="nofollow noreferer noopener"
              className="font-bold uppercase hacktoberfont"
            >
              Hacktoberfest
            </a>{" "}
            está chegando, e o{" "}
            <a
              href="https://discord.gg/yvYXhGj"
              target="_blank"
              rel="nofollow noreferer noopener"
            >
              <b>
                <span className="text-yellow-400">Dev</span>Challenge
              </b>
            </a>{" "}
            está pronto para receber você nessa festa global de desenvolvimento
            de software! Este evento é uma oportunidade emocionante para
            mergulhar de cabeça no mundo do código aberto, contribuir para
            projetos incríveis e crescer como desenvolvedor.
          </p>
        </div>
        <div className="flex items-end p-4">
          <p className="text-3xl font-bold">Desafios Hacktoberfest</p>
          <div className="flex gap-4 ml-auto">
            <div className="space-y-2 w-32">
              <Label htmlFor="category">Categorias</Label>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={""}>{"Todos"}</SelectItem>
                  <SelectItem value={"Full Stack"}>{"Full Stack"}</SelectItem>
                  <SelectItem value={"Front-end"}>{"Front-end"}</SelectItem>
                  <SelectItem value={"Back-end"}>{"Back-end"}</SelectItem>
                  <SelectItem value={"Mobile"}>{"Mobile"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 w-32">
              <Label htmlFor="languages">Linguagens</Label>
              <Select
                value={languageFilter}
                onValueChange={(value) => setLanguageFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Linguagens" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={""}>{"Todos"}</SelectItem>
                  <SelectItem value={"React JS"}>{"React JS"}</SelectItem>
                  <SelectItem value={"React Native"}>
                    {"React Native"}
                  </SelectItem>
                  <SelectItem value={"HTML"}>{"HTML"}</SelectItem>
                  <SelectItem value={"CSS"}>{"CSS"}</SelectItem>
                  <SelectItem value={"Javascript"}>{"Javascript"}</SelectItem>
                  <SelectItem value={"Escollha Livre"}>{"Escollha Livre"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Separator />
        <main className="flex gap-4 flex-wrap py-4 justify-center">
          {filteredChallenges.length === 0 && challengesList.length > 0 && (
            <div className="flex flex-col gap-4 py-10 items-center">
              <div className="flex gap-2 items-center justify-center bg-yellow-400 w-20 h-20 rounded-sm">
                <p className="text-6xl font-bold text-black">D</p>
              </div>
              <p className="text-muted-foreground">
                Sem desafios nessa categoria no momento!
              </p>
            </div>
          )}

          {filteredChallenges.length === 0 && challengesList.length === 0 && (
            <div className="flex flex-col gap-4 py-10 items-center">
              <div className="flex gap-2 items-center justify-center bg-yellow-400 w-20 h-20 rounded-sm">
                <p className="text-6xl font-bold text-black">D</p>
              </div>
              <p className="text-muted-foreground">
                Sem desafios nessa no momento!
              </p>
            </div>
          )}

          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="relative flex flex-col w-72 h-96 gap-4 bg-zinc-800 rounded overflow-hidden"
            >
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div
                  className={`px-4 py-0.5 text-sm font-bold ${colorMatch(
                    challenge?.type
                  )} flex items-center justify-center rounded-full`}
                >
                  {challenge?.type}
                </div>
                <div
                  className={`px-4 py-0.5 text-sm font-bold ${colorMatch(
                    challenge?.level
                  )} flex items-center justify-center rounded-full`}
                >
                  {challenge?.level}
                </div>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-1">
                {challenge.techs.map((item) => (
                  <div
                    key={`${item}-${challenge.id}`}
                    className="px-4 py-0.5 text-sm font-bold bg-gray-700 flex items-center justify-center rounded-full"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <img
                onClick={() => navigate(`/details/${challenge.id}`)}
                className="w-full h-44 aspect-video cursor-pointer"
                src={challenge.background}
              />
              <div className="h-full flex flex-col gap-4 px-4 pb-4 items-center justify-between">
                <h3
                  className="text-2xl text-white cursor-pointer"
                  onClick={() => navigate(`/details/${challenge.id}`)}
                >
                  {challenge.name}
                </h3>

                <p className="text-sm text-white">
                  {challenge.description.length > 120
                    ? challenge.description.substr(0, 120) + "..."
                    : challenge.description}
                </p>

                <Button
                  onClick={() => navigate(`/details/${challenge.id}`)}
                  size="lg"
                  className="w-full bg-purple-800 text-white hover:bg-purple-500 rounded-full"
                >
                  Ver detalhes
                </Button>
              </div>
            </div>
          ))}
        </main>

        <Separator />

        <div className="flex flex-row py-28 items-center justify-center gap-8">
          <div className="flex flex-col gap-2 max-w-xs space-y-2">
            <p className="text-4xl text-yellow-400 font-bold">
              O que é o
              <a
                href="https://hacktoberfest.com/"
                target="_blank"
                rel="nofollow noreferer noopener"
                className="font-bold uppercase hacktoberfont"
              >
                {" "}
                Hacktoberfest
              </a>
              !
            </p>
            <p className="text-white">
              O{" "}
              <a
                href="https://hacktoberfest.com/"
                target="_blank"
                rel="nofollow noreferer noopener"
                className="font-bold uppercase hacktoberfont"
              >
                Hacktoberfest
              </a>{" "}
              é um mês inteiro dedicado à celebração da comunidade de código
              aberto. Durante outubro, desenvolvedores de todo o mundo se reúnem
              para contribuir com projetos de código aberto. A melhor parte?
              Você pode ganhar prêmios incríveis simplesmente participando e
              contribuindo!
            </p>
            <a
              href="https://hacktoberfest.com/"
              target="_blank"
              rel="nofollow noreferer noopener"
              className={`hacktoberfont flex flex-row items-center justify-center text-sm font-medium bg-transparent border border-yellow-400 transition-colors hover:borer-yellow-600 animate-pulse text-yellow-400 px-6 py-2 rounded-full`}
            >
              <img
                src={HacktoberfestIcon}
                alt="hacktoberfest icon"
                className="w-6 h-6 text-black mr-2"
              />
              Registre-se no evento!
            </a>
          </div>

          <a
            href="https://hacktoberfest.com/"
            target="_blank"
            rel="nofollow noreferer noopener"
          >
            <img
              src={HacktoberfestLogo}
              alt="HACKTOBERFEST LOGO"
              className="w-82 h-96"
            />
          </a>
        </div>

        <div className="flex py-8 w-full flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-bold text-yellow-400 max-w-3xl">
            🤔 Por que escolher o DevChallenge para o
            <a
              href="https://hacktoberfest.com/"
              target="_blank"
              rel="nofollow noreferer noopener"
              className="font-bold uppercase hacktoberfont"
            >
              {" "}
              Hacktoberfest
            </a>
            ?
          </h3>
          <p className="text-white max-w-2xl text-center">
            Quando você se junta ao
            <a
              href="https://hacktoberfest.com/"
              target="_blank"
              rel="nofollow noreferer noopener"
              className="font-bold uppercase hacktoberfont"
            >
              {" "}
              Hacktoberfest
            </a>{" "}
            por meio do{" "}
            <a
              href="https://discord.gg/yvYXhGj"
              target="_blank"
              rel="nofollow noreferer noopener"
            >
              <b>
                <span className="text-yellow-400">Dev</span>Challenge
              </b>
            </a>
            , está entrando em uma comunidade apaixonada por desenvolvimento de
            software. Nossa plataforma oferece desafios de programação do mundo
            real, projetos bem documentados e uma comunidade de desenvolvedores
            engajados. Aqui está o que você ganha ao escolher o{" "}
            <a
              href="https://discord.gg/yvYXhGj"
              target="_blank"
              rel="nofollow noreferer noopener"
            >
              <b>
                <span className="text-yellow-400">Dev</span>Challenge
              </b>
            </a>{" "}
            :
          </p>
        </div>

        <div className="py-16 w-full items-center justify-center flex">
          <div className="max-w-6xl items-center justify-center grid xs:grid-rows-4 md:grid-cols-4 gap-4">
            <div className="cursor-pointer w-full md:h-[310px] p-4 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-start">
              <SlScreenDesktop className="w-12 h-12 text-yellow-400" />
              <p className="font-bold text-center">Projetos de Qualidade</p>
              <p className="text-white text-center">
                Contribua para projetos reais e impactantes que farão a
                diferença no mundo.
              </p>
            </div>
            <div className="cursor-pointer w-full md:h-[310px] p-4 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-start">
              <FaDiscord className="w-12 h-12 text-yellow-400" />
              <p className="font-bold text-center">Comunidade Engajada</p>
              <p className="text-white text-center">
                Conecte-se com outros desenvolvedores dedicados que compartilham
                seu entusiasmo pelo código aberto.
              </p>
            </div>
            <div className="cursor-pointer w-full md:h-[310px] p-4 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-start">
              <AiOutlineCode className="w-12 h-12 text-yellow-400" />
              <p className="font-bold text-center">Aprimore Suas Habilidades</p>
              <p className="text-white text-center">
                Desenvolva suas habilidades de programação enquanto contribui
                para projetos de código aberto.
              </p>
            </div>
            <div className="cursor-pointer w-full md:h-[310px] p-4 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-start">
              <IoShirtOutline className="w-12 h-12 text-yellow-400" />
              <p className="font-bold text-center">Prêmios e Reconhecimento</p>
              <p className="text-white text-center">
                Além das recompensas do
                <a
                  href="https://hacktoberfest.com/"
                  target="_blank"
                  rel="nofollow noreferer noopener"
                  className="font-bold uppercase hacktoberfont"
                >
                  {" "}
                  Hacktoberfest
                </a>
                , o{" "}
                <a
                  href="https://discord.gg/yvYXhGj"
                  target="_blank"
                  rel="nofollow noreferer noopener"
                >
                  <b>
                    <span className="text-yellow-400">Dev</span>Challenge
                  </b>
                </a>{" "}
                oferece reconhecimento especial para os membros mais ativos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-8">
          <div className="flex flex-row w-full max-w-4xl md:flex-column gap-4 py-8">
            <div className="flex flex-1 flex-col gap-2">
              <h4 className="text-2xl text-purple-600 font-bold">
                Como Participar?
              </h4>

              <ol className="list-decimal ml-4 space-y-2 marker:text-yellow-400 marker:font-bold">
                <li className="pl-2">Registre-se no Hacktoberfest.</li>
                <li className="pl-2">
                  Escolha desafios do{" "}
                  <a
                    href="https://discord.gg/yvYXhGj"
                    target="_blank"
                    rel="nofollow noreferer noopener"
                  >
                    <b>
                      <span className="text-yellow-400">Dev</span>Challenge
                    </b>
                  </a>{" "}
                  participantes que você deseja contribuir.
                </li>
                <li className="pl-2">
                  Faça suas contribuições e abra pull requests nos projetos do
                  DevChallenge.
                </li>
                <li className="pl-2">
                  Celebre suas contribuições e acompanhe seu progresso.
                </li>
              </ol>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h4 className="text-2xl text-purple-600 font-bold">Bora?!</h4>

              <p className="text-white">
                Junte-se ao
                <a
                  href="https://hacktoberfest.com/"
                  target="_blank"
                  rel="nofollow noreferer noopener"
                  className="font-bold uppercase hacktoberfont"
                >
                  {" "}
                  Hacktoberfest
                </a>{" "}
                através do{" "}
                <a
                  href="https://discord.gg/yvYXhGj"
                  target="_blank"
                  rel="nofollow noreferer noopener"
                >
                  <b>
                    <span className="text-yellow-400">Dev</span>Challenge
                  </b>
                </a>{" "}
                e faça parte de uma comunidade que valoriza seu crescimento como
                desenvolvedor. Vamos celebrar o código aberto juntos e tornar
                outubro um mês incrível para todos nós!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col gap-2 max-w-xs space-y-2">
            <p className="text-4xl font-bold">Entre agora na comunidade!</p>
            <p className="text-yellow-400">
              Participe da comunidade no discord e não perca conteúdos e a ajuda
              da comunidade de devs que estão focados em aprender 😀
            </p>
            <a
              href="https://discord.gg/yvYXhGj"
              target="_blank"
              rel="nofollow noreferer noopener"
              className={`flex flex-row items-center justify-center text-sm font-medium bg-yellow-400 transition-colors hover:bg-yellow-600 animate-pulse text-black px-6 py-2 rounded-full`}
            >
              <FaDiscord className="w-4 h-4 text-black mr-2" />
              Entre na comunidade
            </a>
          </div>
          <Player
            autoplay={true}
            controls={false}
            loop={true}
            src={DiscordAnimation}
            style={{ height: "300px", width: "300px" }}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-8">
          <Player
            autoplay={true}
            controls={false}
            loop={true}
            src="https://assets5.lottiefiles.com/private_files/lf30_WdTEui.json"
            style={{ height: "300px", width: "300px" }}
          />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">
              Seja notificado sobre novos desafios!
            </p>
            <p className="text-yellow-400">
              Inscreva-se para ser o primeiro a saber sobre novos desafios 😀
            </p>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Digite seu melhor email..."
            />
            <Button
              onClick={handleSubscribe}
              type="button"
              className="bg-purple-800 text-white hover:bg-purple-500 rounded-full"
            >
              Inscrever
            </Button>
          </div>
        </div>
      </div>
      <FooterSite />
    </>
  );
}

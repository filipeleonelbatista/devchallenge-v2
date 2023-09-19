import HacktoberfestBanner from "@/assets/hacktoberfest.png";
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
        <img
          className="w-full aspect-[16/4.5] object-cover rounded"
          src={HacktoberfestBanner}
        />
        <div className="flex items-end p-4">
          <p className="text-3xl font-bold">Desafios</p>
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
                  <SelectItem value={"Free Choice"}>{"Free Choice"}</SelectItem>
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

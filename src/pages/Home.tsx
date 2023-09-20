import FooterSite from "@/components/FooterSite";
import HeaderSite from "@/components/HeaderSite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addEmailIntoNewsletter } from "@/utils/NewsLetterFunctions";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { IoCodeSlash, IoSearch, IoShareSocialOutline } from "react-icons/io5";
import { SlScreenDesktop, SlScreenSmartphone } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";

export function Home() {
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

  return (
    <>
      <HeaderSite />
      <div className="container mx-auto p-4 flex flex-col">
        <div className="py-28 items-center justify-center flex flex-col gap-4">
          <h2 className="text-5xl font-bold typewriter">
            Melhore suas habilidades
          </h2>
          <p className="text-lg text-yellow-400 font-bold">
            Com desafios de front-end, back-end e mobile
          </p>
          <Button
            onClick={() => navigate("/challenges")}
            size="lg"
            className="bg-purple-800 text-white hover:bg-purple-500 rounded-full"
          >
            Bora Codar?!
          </Button>
        </div>
        <div className="py-24 items-center justify-center flex flex-row flex-wrap gap-4">
          <Link
            to="/challenges?type=Front-end"
            className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center"
          >
            <SlScreenDesktop className="w-12 h-12 text-yellow-400" />
            <p className="font-bold">Front-end</p>
          </Link>
          <Link
            to="/challenges?type=Back-end"
            className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center"
          >
            <IoCodeSlash className="w-12 h-12 text-yellow-400" />
            <p className="font-bold">Back-end</p>
          </Link>
          <Link
            to="/challenges?type=Mobile"
            className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center"
          >
            <SlScreenSmartphone className="w-12 h-12 text-yellow-400" />
            <p className="font-bold">Mobile</p>
          </Link>
          <Link
            to="/challenges?type=Full Stack"
            className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center"
          >
            <SlScreenSmartphone className="w-12 h-12 text-yellow-400" />
            <p className="font-bold">Full Stack</p>
          </Link>
        </div>
        <div className="py-18 items-center justify-center flex flex-row flex-wrap gap-4">
          <div className="w-64 p-16 flex flex-col gap-2 items-center justify-center">
            <IoSearch className="w-12 h-12 text-white" />
            <p className="font-bold text-yellow-400">Escolha</p>
          </div>
          <div className="w-64 p-16 flex flex-col gap-2 items-center justify-center">
            <IoCodeSlash className="w-12 h-12 text-white" />
            <p className="font-bold text-yellow-400">Desenvolva</p>
          </div>
          <div className="w-64 p-16 flex flex-col gap-2 items-center justify-center">
            <IoShareSocialOutline className="w-12 h-12 text-white" />
            <p className="font-bold text-yellow-400">Compartilhe</p>
          </div>
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

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

export function Challenges() {
  return (
    <>
      <HeaderSite />
      <div className="container mx-auto p-4 flex flex-col">
        <div className="flex items-end p-4">
          <p className="text-3xl font-bold">Desafios</p>
          <div className="flex gap-4 ml-auto">
            <div className="space-y-2 w-32">
              <Label htmlFor="category">Categorias</Label>
              <Select id="category" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Front-end"}>{"Front-end"}</SelectItem>
                  <SelectItem value={"Back-end"}>{"Back-end"}</SelectItem>
                  <SelectItem value={"Mobile"}>{"Mobile"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 w-32">
              <Label htmlFor="languages">Linguagens</Label>
              <Select id="languages" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="Linguagens" />
                </SelectTrigger>
                <SelectContent>
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
          <div className="relative flex flex-col w-72 h-96 gap-4 bg-zinc-800 rounded overflow-hidden">
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="px-4 py-0.5 text-sm font-bold bg-pink-500 flex items-center justify-center rounded-full">
                Tech
              </div>
              <div className="px-4 py-0.5 text-sm font-bold bg-orange-400 flex items-center justify-center rounded-full">
                Intermediario
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <div className="px-4 py-0.5 text-sm font-bold bg-gray-500 flex items-center justify-center rounded-full">
                React Native
              </div>
            </div>
            <img
              className="w-full h-44 object-cover"
              src="https://github.com/filipeleonelbatista.png"
            />
            <div className="h-full flex flex-col gap-4 px-4 pb-4 items-center justify-between">
              <h3 className="text-2xl text-white">Desafio</h3>

              <p className="text-sm text-white">
                Com desafios de front-end, back-end e mobile
              </p>

              <Button
                size="lg"
                className="w-full bg-purple-800 text-white hover:bg-purple-500 rounded-full"
              >
                Ver detalhes
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col w-72 h-96 gap-4 bg-zinc-800 rounded overflow-hidden">
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="px-4 py-0.5 text-sm font-bold bg-pink-500 flex items-center justify-center rounded-full">
                Tech
              </div>
              <div className="px-4 py-0.5 text-sm font-bold bg-orange-400 flex items-center justify-center rounded-full">
                Intermediario
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <div className="px-4 py-0.5 text-sm font-bold bg-gray-500 flex items-center justify-center rounded-full">
                React Native
              </div>
            </div>
            <img
              className="w-full h-44 object-cover"
              src="https://github.com/filipeleonelbatista.png"
            />
            <div className="h-full flex flex-col gap-4 px-4 pb-4 items-center justify-between">
              <h3 className="text-2xl text-white">Desafio</h3>

              <p className="text-sm text-white">
                Com desafios de front-end, back-end e mobile
              </p>

              <Button
                size="lg"
                className="w-full bg-purple-800 text-white hover:bg-purple-500 rounded-full"
              >
                Ver detalhes
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col w-72 h-96 gap-4 bg-zinc-800 rounded overflow-hidden">
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="px-4 py-0.5 text-sm font-bold bg-pink-500 flex items-center justify-center rounded-full">
                Tech
              </div>
              <div className="px-4 py-0.5 text-sm font-bold bg-orange-400 flex items-center justify-center rounded-full">
                Intermediario
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <div className="px-4 py-0.5 text-sm font-bold bg-gray-500 flex items-center justify-center rounded-full">
                React Native
              </div>
            </div>
            <img
              className="w-full h-44 object-cover"
              src="https://github.com/filipeleonelbatista.png"
            />
            <div className="h-full flex flex-col gap-4 px-4 pb-4 items-center justify-between">
              <h3 className="text-2xl text-white">Desafio</h3>

              <p className="text-sm text-white">
                Com desafios de front-end, back-end e mobile
              </p>

              <Button
                size="lg"
                className="w-full bg-purple-800 text-white hover:bg-purple-500 rounded-full"
              >
                Ver detalhes
              </Button>
            </div>
          </div>
        </main>
      </div>
      <FooterSite />
    </>
  );
}

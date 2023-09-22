import FooterSite from "@/components/FooterSite";
import HeaderSite from "@/components/HeaderSite";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uploadImageAsync } from "@/context/ChallengesContext";
import { useChallenges } from "@/hooks/useChallenges";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { FaCodeBranch, FaTrash } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";
import * as Yup from "yup";

import { GoVideo } from "react-icons/go";
import { v4 } from "uuid";
import AcceptTerms from "@/components/AcceptTerms";

interface FormType {
  name: string;
  description: string;
  type: string;
  level: string;
  username: string;
  githubRepository: string;
  techs: string[];
  background: File | null;
}

export function Community() {
  const { addChallenge } = useChallenges();

  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O campo Nome é obrigatório"),
      description: Yup.string().required("O campo Descrição é obrigatório"),
      type: Yup.string().required("O campo Tipo é obrigatório"),
      level: Yup.string().required("O campo Dificuldade é obrigatório"),
      techs: Yup.array()
        .of(Yup.string())
        .min(1, "Selecione pelo menos uma linguagem")
        .required("O campo Linguagens é obrigatório"),
      background: Yup.mixed()
        .test("fileFormat", "A imagem deve ser PNG ou JPG", (value: any) => {
          if (!value) {
            return true;
          }
          const supportedFormats = ["image/png", "image/jpeg"];
          return supportedFormats.includes(value.type);
        })
        .required("O campo Imagem é obrigatório"),
      githubRepository: Yup.string().required(
        "O campo Repositório é obrigatório"
      ),
      username: Yup.string().required("O campo Usuário github é obrigatório"),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
      level: "",
      username: "",
      githubRepository: "",
      techs: [],
      background: null,
    },
    validationSchema: formSchema,
    onSubmit: (values: FormType) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (formValues: FormType) => {
    setIsLoadingForm(true);
    let uploadURLImage = formValues.background
      ? await uploadImageAsync(formValues.background, "challenges")
      : "";

    const data = {
      id: v4(),
      type: formValues.type,
      level: formValues.level,
      techs: formValues.techs,
      githubRepository: formValues.githubRepository,
      username: formValues.username,
      background: uploadURLImage ?? "",
      name: formValues.name,
      description: formValues.description,
      createdAt: Date.now(),
      active: false,
    };

    await addChallenge(data);
    formik.resetForm();
    setImagePreview(null);
    document.getElementById("dialog-close")?.click();
    setIsLoadingForm(false);
  };

  const handleRemoveTech = (index: number) => {
    const result = formik.values.techs.filter(
      (_, currentIndex) => !(currentIndex === index)
    );
    formik.setFieldValue("techs", result);
  };

  return (
    <>
      <Dialog>
        <DialogContent className="h-4/5 overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Adicionar desafio</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 my-6"
          >
            <div className="flex flex-col gap-4">
              <label
                htmlFor="background"
                className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-small flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="imagem carregada"
                    className=" aspect-video w-full h-full object-cover rounded-lg p-2 pointer-events-none absolute inset-0"
                  />
                ) : (
                  <>
                    <GoVideo className="w-4 h-4" />
                    Selecione uma imagem
                  </>
                )}
              </label>
              {!!formik.errors.background && (
                <p className="text-sm text-red-600">
                  {formik.errors.background}
                </p>
              )}
              <input
                type="file"
                disabled={isLoadingForm}
                id="background"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  if (event.target.files) {
                    formik.setFieldValue("background", event.target.files[0]);

                    setImagePreview(URL.createObjectURL(event.target.files[0]));
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Nome do desafio</Label>
              <Input
                disabled={isLoadingForm}
                id="name"
                placeholder="Desafio ..."
                type="text"
                value={formik.values.name}
                onChange={(event) =>
                  formik.setFieldValue("name", event.target.value)
                }
                autoCapitalize="none"
                autoCorrect="off"
              />
              {!!formik.errors.name && (
                <p className="text-sm text-red-600">{formik.errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="username">Nome de Usuário github</Label>
              <Input
                disabled={isLoadingForm}
                id="username"
                placeholder="Seu username github"
                type="text"
                value={formik.values.username}
                onChange={(event) =>
                  formik.setFieldValue("username", event.target.value)
                }
                autoCapitalize="none"
                autoCorrect="off"
              />
              {!!formik.errors.username && (
                <p className="text-sm text-red-600">{formik.errors.username}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="githubRepository">Link do repositório</Label>
              <Input
                disabled={isLoadingForm}
                id="githubRepository"
                placeholder="https://github.com/..."
                type="text"
                value={formik.values.githubRepository}
                onChange={(event) =>
                  formik.setFieldValue("githubRepository", event.target.value)
                }
                autoCapitalize="none"
                autoCorrect="off"
              />
              {!!formik.errors.githubRepository && (
                <p className="text-sm text-red-600">
                  {formik.errors.githubRepository}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="type">Tipo</Label>

              <Select
                disabled={isLoadingForm}
                onValueChange={(event) => formik.setFieldValue("type", event)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Full Stack"}>{"Full Stack"}</SelectItem>
                  <SelectItem value={"Front-end"}>{"Front-end"}</SelectItem>
                  <SelectItem value={"Back-end"}>{"Back-end"}</SelectItem>
                  <SelectItem value={"Mobile"}>{"Mobile"}</SelectItem>
                </SelectContent>
              </Select>
              {!!formik.errors.type && (
                <p className="text-sm text-red-600">{formik.errors.type}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="level">Dificuldade</Label>

              <Select
                disabled={isLoadingForm}
                onValueChange={(event) => formik.setFieldValue("level", event)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Iniciante"}>{"Iniciante"}</SelectItem>
                  <SelectItem value={"Intermediário"}>
                    {"Intermediário"}
                  </SelectItem>
                  <SelectItem value={"Avançado"}>{"Avançado"}</SelectItem>
                </SelectContent>
              </Select>
              {!!formik.errors.level && (
                <p className="text-sm text-red-600">{formik.errors.level}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="techs">Linguagens</Label>

              <Select
                disabled={isLoadingForm}
                onValueChange={(event) =>
                  formik.setFieldValue("techs", [...formik.values.techs, event])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="h-32">
                  <SelectItem value={"React Native"}>
                    {"React Native"}
                  </SelectItem>
                  <SelectItem value={"React JS"}>{"React JS"}</SelectItem>
                  <SelectItem value={"Javascript"}>{"Javascript"}</SelectItem>
                  <SelectItem value={"Typescript"}>{"Typescript"}</SelectItem>
                  <SelectItem value={"Flutter"}>{"Flutter"}</SelectItem>
                  <SelectItem value={"Kotlin"}>{"Kotlin"}</SelectItem>
                  <SelectItem value={"Swift"}>{"Swift"}</SelectItem>
                  <SelectItem value={"Vue"}>{"Vue"}</SelectItem>
                  <SelectItem value={"Angular"}>{"Angular"}</SelectItem>
                  <SelectItem value={"Python"}>{"Python"}</SelectItem>
                  <SelectItem value={"NodeJS"}>{"NodeJS"}</SelectItem>
                  <SelectItem value={"Ruby"}>{"Ruby"}</SelectItem>
                  <SelectItem value={"PHP"}>{"PHP"}</SelectItem>
                  <SelectItem value={"Java"}>{"Java"}</SelectItem>
                  <SelectItem value={"Escolha Livre"}>
                    {"Escolha Livre"}
                  </SelectItem>
                  <SelectItem value={"HTML"}>{"HTML"}</SelectItem>
                  <SelectItem value={"CSS"}>{"CSS"}</SelectItem>
                </SelectContent>
              </Select>
              <div>
                {formik.values.techs.length > 0 &&
                  formik.values.techs.map((tech, index) => (
                    <div className="flex gap-4 items-center my-2" key={index}>
                      <p>{tech}</p>
                      <Button
                        disabled={isLoadingForm}
                        onClick={() => handleRemoveTech(index)}
                        className=" w-6 h-6 p-2 bg-red-600 rounded-full hover:bg-red-800"
                      >
                        <FaTrash className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  ))}
              </div>

              {!!formik.errors.techs && (
                <p className="text-sm text-red-600">{formik.errors.techs}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="description">Descrição</Label>

              <Textarea
                disabled={isLoadingForm}
                onChange={(event) =>
                  formik.setFieldValue("description", event.target.value)
                }
                rows={4}
                placeholder="Digite a descrição do desafio"
              />

              {!!formik.errors.techs && (
                <p className="text-sm text-red-600">{formik.errors.techs}</p>
              )}
            </div>

            <Button
              disabled={isLoadingForm}
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-600"
            >
              Adicionar
            </Button>
          </form>
        </DialogContent>

        <HeaderSite />
        <div className="container p-4 flex flex-col">
          <div className="w-full py-24 items-center justify-center flex flex-row flex-wrap gap-4">
            <DialogTrigger className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center">
              <GoLightBulb className="w-12 h-12 text-yellow-400" />
              <p className="text-center font-bold">Enviar novo desafio</p>
            </DialogTrigger>

            <a
              href="https://discord.gg/yvYXhGj"
              target="_blank"
              rel="nofollow noreferer noopener"
              className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center"
            >
              <FiMessageCircle className="w-12 h-12 text-yellow-400" />
              <p className="text-center font-bold">Participar da comunidade</p>
            </a>
            <a
              href="https://github.com/filipeleonelbatista/devchallenge-v2"
              target="_blank"
              rel="nofollow noreferer noopener"
              className="cursor-pointer w-64 p-16 bg-zinc-900 hover:bg-zinc-700 rounded flex flex-col gap-2 items-center justify-center"
            >
              <FaCodeBranch className="w-12 h-12 text-yellow-400" />
              <p className="text-center font-bold">Contribuir open source</p>
            </a>
          </div>
        </div>
        <FooterSite />
      </Dialog>
      <AcceptTerms />
    </>
  );
}

import FooterSite from "@/components/FooterSite";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

import { GoVideo } from "react-icons/go";

export function Dashboard() {
  const navigate = useNavigate();
  const { challengesList, handleDeleteChallenge, addChallenge } =
    useChallenges();

  const [imagePreview, setImagePreview] = useState(null);

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
        .test("fileFormat", "A imagem deve ser PNG ou JPG", (value) => {
          if (!value) {
            return true;
          }
          const supportedFormats = ["image/png", "image/jpeg"];
          return supportedFormats.includes(value.type);
        })
        .required("O campo Imagem é obrigatório"),
      active: Yup.boolean(),
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
      active: true,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleRemoveTech = (index) => {
    const result = formik.values.techs.filter(
      (_, currentIndex) => !(currentIndex === index)
    );
    formik.setFieldValue("techs", result);
  };

  const handleSubmitForm = async (formValues) => {
    let uploadURLImage = await uploadImageAsync(
      formValues.background,
      "challenges"
    );

    const data = {
      type: formValues.type,
      level: formValues.level,
      techs: formValues.techs,
      githubRepository: formValues.githubRepository,
      username: formValues.username,
      background: uploadURLImage,
      name: formValues.name,
      description: formValues.description,
      createdAt: Date.now(),
      active: formValues.active,
    };

    await addChallenge(data);

    document.getElementById("dialog-close")?.click();
  };

  return (
    <>
      <Dialog>
        <DialogContent className="h-4/5 overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Adicionar desafio</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              console.log(formik.errors);
              formik.handleSubmit(event);
            }}
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
                id="background"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  formik.setFieldValue("background", event.target.files[0]);

                  setImagePreview(URL.createObjectURL(event.target.files[0]));
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Nome do desafio</Label>
              <Input
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
                id="type"
                onValueChange={(event) => formik.setFieldValue("type", event)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
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
                id="level"
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
                id="techs"
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

            <Button type="submit" className="bg-yellow-400 hover:bg-yellow-600">
              Adicionar
            </Button>
          </form>
        </DialogContent>

        <Header />
        <div className="container mx-auto p-4 flex flex-col">
          <div className="flex items-end p-4">
            <p className="text-3xl font-bold">Desafios</p>
            <div className="flex gap-4 ml-auto">
              <DialogTrigger className=" px-8 py-2 rounded text-black font-semibold bg-yellow-400 hover:bg-yellow-600">
                Adicionar Desafio
              </DialogTrigger>
            </div>
          </div>
          <Separator />

          <Table>
            <TableCaption>Lista dos desafios adicionados.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tecnologia</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead>Disponível</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challengesList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <img
                      src={item.background}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.techs.join(",")}</TableCell>
                  <TableCell>{item.level}</TableCell>
                  <TableCell>
                    {item.active ? (
                      <FaCheck className="w-6 h-6 text-green-600" />
                    ) : (
                      <FaTimes className="w-6 h-6 text-red-600" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleDeleteChallenge(item.id)}
                      className=" w-10 h-10 p-3 bg-red-600 rounded-full hover:bg-red-800"
                    >
                      <FaTrash className="w-6 h-6 text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <FooterSite />
      </Dialog>
    </>
  );
}

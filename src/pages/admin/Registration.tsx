import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import * as Yup from "yup";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export function Registration() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string().required("O campo Email é obrigatório"),
      password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("A senha é obrigatória"),
      remember: Yup.boolean(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: formSchema,
    onSubmit: (values: LoginForm) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (formValues: LoginForm) => {
    try {
      setIsLoading(true);
      if (formValues.remember) {
        secureLocalStorage.setItem(
          "remember",
          JSON.stringify({
            email: formValues.email,
            password: formValues.password,
          })
        );
      }
      const isLogged = await signInUser(formValues.email, formValues.password);
      if (isLogged.status) {
        navigate("/admin/inicio");
      } else {
        alert(isLogged.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const executeAsync = async () => {
      const response = secureLocalStorage.getItem("remember");
      if (response) {
        const user = JSON.parse(response);
        const isLogged = await signInUser(user.email, user.password);
        if (isLogged.status) {
          navigate("/admin/inicio");
        } else {
          alert(isLogged.message);
        }
      }
    };
    executeAsync();
  }, []);

  return (
    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link to="/admin" className="absolute right-4 top-4 md:right-8 md:top-8">
        Entrar
      </Link>
      <div
        style={{
          backgroundImage: "url(https://source.unsplash.com/random?technology)",
        }}
        className="relative hidden bg-cover bg-center h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex"
      >
        <div className="absolute inset-0 bg-zinc-900/20" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Aprenda, compartilhe conhecimento, cresça, contribua, se
              supere! Esse é o objetivo.&rdquo;
            </p>
            <footer className="text-sm">Desconhecido</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastre-se
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email e senha para continuar
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="vc@challenger.com"
                    type="email"
                    value={formik.values.email}
                    onChange={(event) =>
                      formik.setFieldValue("email", event.target.value)
                    }
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  {!!formik.errors.email && (
                    <p className="text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    Senha
                  </Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      id="password"
                      placeholder="*********"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={(event) =>
                        formik.setFieldValue("password", event.target.value)
                      }
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                    <Button
                      className="bg-yellow-400 hover:bg-yellow-600 "
                      onClick={handleClickShowPassword}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>

                  {!!formik.errors.password && (
                    <p className="text-sm text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-yellow-400 hover:bg-yellow-600"
                >
                  Cadastrar
                </Button>
              </div>
            </form>
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou acesse o nosso Github
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
              <FaGithub className="mr-2 h-4 w-4" /> Github
            </Button> */}
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Clicando em continuar você aceita nossos{" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de serviço
            </Link>{" "}
            e{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politicas de privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

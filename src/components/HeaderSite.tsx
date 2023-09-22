import dayjs from "dayjs";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

function LinksComponent() {
  const location = useLocation();

  return (
    <>
      <Link
        to="/"
        className={`text-sm font-medium ${
          location.pathname === "/"
            ? "text-yellow-400"
            : "text-muted-foreground"
        } transition-colors hover:text-yellow-600`}
      >
        Inicio
      </Link>
      <Link
        to="/about"
        className={`text-sm font-medium ${
          location.pathname === "/about"
            ? "text-yellow-400"
            : "text-muted-foreground"
        } transition-colors hover:text-yellow-600`}
      >
        Sobre nós
      </Link>
      <Link
        to="/challenges"
        className={`text-sm font-medium ${
          location.pathname === "/challenges"
            ? "text-yellow-400"
            : "text-muted-foreground"
        } transition-colors hover:text-yellow-600`}
      >
        Desafios
      </Link>
      <Link
        to="/devs"
        className={`text-sm font-medium ${
          location.pathname === "/devs"
            ? "text-yellow-400"
            : "text-muted-foreground"
        } transition-colors hover:text-yellow-600`}
      >
        Comunidade
      </Link>
      {dayjs().isAfter(dayjs(`${new Date().getFullYear()}-09-15`)) &&
        dayjs().isBefore(dayjs(`${new Date().getFullYear()}-11-05`)) && (
          <Link
            to="/hacktoberfest"
            className={`text-sm font-medium ${
              location.pathname === "/hacktoberfest"
                ? "bg-yellow-400"
                : "bg-yellow-400"
            } transition-colors hover:bg-yellow-600 animate-pulse text-black px-6 py-2 rounded-full`}
          >
            Hacktoberfest {new Date().getFullYear()}
          </Link>
        )}
    </>
  );
}

export default function HeaderSite() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-row border-b h-16 items-center px-4">
      <Logo />
      <div className="flex w-full md:hidden justify-end p-0 m-0">
        <Button onClick={() => setOpen(!open)} variant="outline">
          <FaBars className="w-4 h-4 text-white" />
        </Button>
        {open && (
          <div className="flex flex-col items-center gap-4 absolute top-14 right-4 w-56 rounded p-4 z-10 bg-zinc-950 border border-inherit shadow">
            <LinksComponent />
          </div>
        )}
      </div>

      <nav className="hidden md:flex ml-auto flex items-center space-x-4 mx-6 items-center space-x-4 lg:space-x-6">
        <LinksComponent />
      </nav>
    </div>
  );
}

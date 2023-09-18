import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLocation } from "react-router-dom";

export default function HeaderSite() {
  const location = useLocation();

  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Logo />
          <nav className="ml-auto flex items-center space-x-4 mx-6 flex items-center space-x-4 lg:space-x-6">
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
          </nav>
          {/* <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div> */}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Logo />
          <nav className="ml-auto flex items-center space-x-4 mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/admin/inicio"
              className={`text-sm font-medium ${
                location.pathname === "/admin/inicio"
                  ? "text-yellow-400"
                  : "text-muted-foreground"
              } transition-colors hover:text-yellow-600`}
            >
              Desafios
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

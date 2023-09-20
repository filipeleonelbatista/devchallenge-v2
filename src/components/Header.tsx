import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

import { GoSignOut } from "react-icons/go";

export default function Header() {
  const location = useLocation();
  const auth = useAuth();

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
            <Button
              onClick={() => {
                if (auth && auth.logout) {
                  auth.logout();
                }
              }}
              className=" w-10 h-10 p-2 bg-yellow-400 rounded-full hover:bg-yellow-600"
            >
              <GoSignOut className="w-6 h-6 text-black" />
            </Button>
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

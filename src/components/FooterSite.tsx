import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { FaGithub, FaDiscord } from "react-icons/fa";

export default function FooterSite() {
  return (
    <div className="flex-col flex">
      <div className="border-t">
        <div className="flex flex-col gap-4 md:flex-row h-16 items-center px-4 py-16">
          <nav className="flex items-center space-x-4 mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link href="/challenges">
              <FaDiscord className="w-6 h-6 text-sm font-medium text-muted-foreground transition-colors hover:text-yellow-400" />
            </Link>
            <Link href="/challenges">
              <FaGithub className="w-6 h-6 text-sm font-medium text-muted-foreground transition-colors hover:text-yellow-400" />
            </Link>
          </nav>

          <div className="flex-1 text-center items-center justify-center">
            <p>Desenvolvido com 💛 pela comunidade!</p>
            <p>Direitos reservados &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="ml-0 pb-4 md:pb-0 md:ml-auto mr-6">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}

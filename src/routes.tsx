import { ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { About } from "./pages/About";
import { Dashboard } from "./pages/admin/Dashboard";
import { Login } from "./pages/admin/Login";
import { Registration } from "./pages/admin/Registration";
import { Challenges } from "./pages/Challenges";
import { Community } from "./pages/Community";
import { Detail } from "./pages/Detail";
import { Hacktoberfest } from "./pages/Hacktoberfest";
import { Home } from "./pages/Home";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const auth = useAuth();

  const isLogged = auth?.isLogged;

  return isLogged ? element : <Navigate to="/admin" replace />;
};

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hacktoberfest" element={<Hacktoberfest />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/devs" element={<Community />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/registration" element={<Registration />} />
        <Route
          path="/admin/inicio"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

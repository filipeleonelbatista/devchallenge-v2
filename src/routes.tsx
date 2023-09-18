import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Dashboard } from "./pages/admin/Dashboard";
import { Login } from "./pages/admin/Login";
import { Registration } from "./pages/admin/Registration";
import { Challenges } from "./pages/Challenges";
import { Community } from "./pages/Community";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";

const ProtectedRoute = ({ element }) => {
  const { isLogged } = useAuth();

  return isLogged ? element : <Navigate to="/login" replace />;
};

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/challenges" exact element={<Challenges />} />
        <Route path="/challenge" exact element={<Detail />} />
        <Route path="/devs" exact element={<Community />} />
        <Route path="/admin" exact element={<Login />} />
        <Route path="/admin/registration" exact element={<Registration />} />
        <Route
          path="/admin/inicio"
          exact
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

import { AuthContextProvider } from "./context/AuthContext";
import { ChallengesContextProvider } from "./context/ChallengesContext";
import { Routes } from "./routes";

export function App() {
  return (
    <AuthContextProvider>
      <ChallengesContextProvider>
        <Routes />
      </ChallengesContextProvider>
    </AuthContextProvider>
  );
}

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const value = useContext(AuthContext);
  return value;
}

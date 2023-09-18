import { ChallengesContext } from "@/context/ChallengesContext";
import { useContext } from "react";

export function useChallenges() {
  const value = useContext(ChallengesContext);
  return value;
}

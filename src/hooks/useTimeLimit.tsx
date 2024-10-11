import { useGameStore } from "../store";
import { GameLevel } from "../types/Game";

export const useTimeLimit = () => {
  const selectedLevel = useGameStore((state) => state.levelGame);

  return selectedLevel === GameLevel.easy
    ? 120
    : selectedLevel === GameLevel.medium
    ? 60
    : 20;
};

import { create } from "zustand";
import { GameLevel } from "../types/Game";

type GameStoreType = {
  isGameActive: boolean;
  setIsGameActive: (isGameActive: boolean) => void;
  levelGame: GameLevel;
  setLevelGame: (levelGame: GameLevel) => void;
  timer: number;
  increaseTimer: VoidFunction;
  resetTimer: VoidFunction;
  wins: number;
  losses: number;
  increaseLosses: VoidFunction;
  increaseWins: VoidFunction;
};

export const useGameStore = create<GameStoreType>((set) => ({
  isGameActive: false,
  setIsGameActive: (isGameActive: boolean) => set({ isGameActive }),
  levelGame: GameLevel.easy,
  setLevelGame: (levelGame: GameLevel) => set({ levelGame }),
  timer: 0,
  increaseTimer: () => set((state) => ({ timer: state.timer + 1 })),
  resetTimer: () => set({ timer: 0 }),
  wins: 0,
  losses: 0,
  increaseWins: () => set((state) => ({ wins: state.wins + 1 })),
  increaseLosses: () => set((state) => ({ losses: state.losses + 1 })),
}));

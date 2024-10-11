import { v4 as uuidv4 } from "uuid";
import { CardImages } from "../config";
import { CardConfig, SelectedCard } from "../types";
import { useMemo, useRef, useState } from "react";
import { useGameStore } from "../store";
import { useTimeLimit } from "./useTimeLimit";

type DashboardState = {
  displayedCards: Array<SelectedCard>;
  matches: number;
  clickedCount: number;
};

export const useDashboardCards = () => {
  const time = useGameStore((state) => state.timer);
  const setIsGameActive = useGameStore((state) => state.setIsGameActive);
  const increaseLosses = useGameStore((state) => state.increaseLosses);
  const increaseWins = useGameStore((state) => state.increaseWins);
  const limitTime = useTimeLimit();

  const blockClick = useRef(false);
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    displayedCards: [],
    matches: 0,
    clickedCount: 0,
  });

  const shuffleArray = (array: Array<CardConfig>) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const resetMismatchedCards = () => {
    setDashboardState((prev) => {
      const length = prev.displayedCards.length;

      return {
        ...prev,
        displayedCards: prev.displayedCards.filter(
          (_, index) => index < length - 2
        ),
        clickedCount: 0,
      };
    });
    blockClick.current = false;
  };

  const DashboardConfig = useMemo(() => {
    const initialConfig = CardImages.reduce<Array<CardConfig>>((acc, item) => {
      const newItem = {
        id: item.image,
        uniqUUID: uuidv4(),
        image: item.image,
      };
      const twinItem = {
        id: item.image,
        uniqUUID: uuidv4(),
        image: item.image,
      };
      return [...acc, newItem, twinItem];
    }, []);

    return shuffleArray(initialConfig);
  }, []);

  // check if time is greater than limit time
  if (time >= limitTime) {
    setIsGameActive(false);
    increaseLosses();
  }

  const updateState = (item: SelectedCard) => {
    setDashboardState((prev) => {
      const checkMatch = prev.clickedCount + 1 === 2;
      const isCardMatch = prev.displayedCards.some(
        (card) => card.id === item.id
      );
      const displayedCards = [...prev.displayedCards, item];

      if (displayedCards.length === DashboardConfig.length) {
        setIsGameActive(false);
        increaseWins();

        return prev;
      }

      if (checkMatch && isCardMatch) {
        return {
          displayedCards: displayedCards,
          matches: prev.matches + 1,
          clickedCount: 0,
        };
      }

      if (checkMatch && !isCardMatch) {
        setTimeout(resetMismatchedCards, 2000);
        blockClick.current = true;
        return {
          ...prev,
          displayedCards: displayedCards,
        };
      }

      return {
        displayedCards: displayedCards,
        matches: prev.matches,
        clickedCount: prev.clickedCount + 1,
      };
    });
  };

  return {
    dashboardConfig: DashboardConfig,
    dashboardState: dashboardState,
    updateState: updateState,
    blockClick: blockClick,
  };
};

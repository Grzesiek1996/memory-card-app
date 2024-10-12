import { useEffect } from "react";
import { useGameStore } from "../../store";
import { GameLevel } from "../../types/Game";
import { Button } from "./Button";
import "../../styles";
import { useTimeLimit } from "../../hooks";

type GameHeaderProps = {
  isGameActive: boolean;
};

export const GameHeader: React.FunctionComponent<GameHeaderProps> = ({
  isGameActive,
}) => {
  const setLevel = useGameStore((state) => state.setLevelGame);
  const selectedLevel = useGameStore((state) => state.levelGame);
  const time = useGameStore((state) => state.timer);
  const increaseTimer = useGameStore((state) => state.increaseTimer);
  const resetTime = useGameStore((state) => state.resetTimer);
  const losses = useGameStore((state) => state.losses);
  const wins = useGameStore((state) => state.wins);
  const limitTime = useTimeLimit();
  const startGame = useGameStore((state) => state.setIsGameActive);

  useEffect(() => {
    if (!isGameActive) {
      resetTime();
      return;
    }

    const interval = setInterval(() => {
      increaseTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive]);

  return (
    <div className="gameHeader">
      {isGameActive && (
        <div>
          <p>Level: {selectedLevel}</p>
          <p>Timer: {time}</p>
          <p>You have {limitTime} seconds to win</p>
        </div>
      )}
      {!isGameActive && (
        <>
          <h3>Choose Game Level</h3>
          <div className="gemeHeader__level-options">
            {Object.values(GameLevel).map((levelValue) => (
              <Button
                key={levelValue}
                className={`button ${
                  selectedLevel === levelValue ? "active" : ""
                }`}
                onClick={() => setLevel(levelValue)}
                label={levelValue}
              />
            ))}
          </div>
          <div className="gameHeader__statistics">
            <h3>Statistics</h3>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
          </div>
          <Button label="Start Game" onClick={() => startGame(true)} />
        </>
      )}
    </div>
  );
};

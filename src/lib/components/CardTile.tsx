import { FunctionComponent } from "react";
import { SelectedCard } from "../../types";
import "../../styles";
import QuestionLogo from "../../assets/question-mark.svg?react";

type CardTileProps = {
  image: string;
  id: string;
  uniqUUID: string;
  displayedCards: Array<SelectedCard>;
  blockClick: React.MutableRefObject<boolean>;
  showCard: (card: SelectedCard) => void;
};

export const CardTile: FunctionComponent<CardTileProps> = ({
  image,
  id,
  showCard,
  displayedCards,
  uniqUUID,
  blockClick,
}) => {
  const displayCard = displayedCards.some((card) => card.uniqUUID === uniqUUID);

  return (
    <div
      className={`flip-card ${displayCard ? "flipped" : ""}`}
      onClick={() => {
        if (displayCard || blockClick.current) {
          return;
        }
        showCard({ id, uniqUUID });
      }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <QuestionLogo />
        </div>
        <div className="flip-card-back">
          <img src={image} alt="card" />
        </div>
      </div>
    </div>
  );
};

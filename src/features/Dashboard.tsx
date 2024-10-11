import { useDashboardCards } from "../hooks";
import { CardTile } from "../lib/components";
import "../styles";

export const Dashboard = () => {
  const { dashboardConfig, dashboardState, updateState, blockClick } =
    useDashboardCards();

  return (
    <div className="dashboard">
      <div className="dashboard__cards">
        {dashboardConfig.map((card) => (
          <CardTile
            key={card.uniqUUID}
            image={card.image}
            id={card.id}
            blockClick={blockClick}
            uniqUUID={card.uniqUUID}
            showCard={updateState}
            displayedCards={dashboardState.displayedCards}
          />
        ))}
      </div>
    </div>
  );
};

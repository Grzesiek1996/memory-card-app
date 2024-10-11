import "./App.css";
import { Dashboard } from "./features";
import { GameHeader } from "./lib/components";
import { useGameStore } from "./store";

function App() {
  const isGameActive = useGameStore((state) => state.isGameActive);

  return (
    <>
      <GameHeader isGameActive={isGameActive} />
      {isGameActive && <Dashboard />}
    </>
  );
}

export default App;

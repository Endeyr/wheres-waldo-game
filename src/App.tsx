import { useEffect, useState } from "react";
import CanvasComponent from "./components/canvas";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [message, setMessage] = useState("");
  const [waldoFound, setWaldoFound] = useState(false);
  const [score, setScore] = useState(6);
  const waldoPosition = { x: 780, y: 264, width: 20, height: 30 };
  useEffect(() => {
    const interval = setInterval(() => {
      if (score > 0 && gameStart && !waldoFound) {
        setScore(score - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStart, score, waldoFound]);
  useEffect(() => {
    if (score === 0) {
      setMessage("You lose!");
      setWaldoFound(true);
    }
  }, [score]);
  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const canvas = e.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (
      x >= waldoPosition.x &&
      x <= waldoPosition.x + waldoPosition.width &&
      y >= waldoPosition.y &&
      y <= waldoPosition.y + waldoPosition.height
    ) {
      setMessage("You found Waldo!");
      setWaldoFound(true);
    } else {
      if (!waldoFound) {
        setMessage("Try again.");
      }
    }
  };
  const playAgain = () => {
    setGameStart(false);
    setMessage("");
    setWaldoFound(false);
    setScore(60);
  };
  return (
    <>
      <div className="m-2 flex h-[95dvh] flex-col items-center justify-start  p-2">
        <h1 className="mb-2">Where's Waldo Game</h1>
        {gameStart ? (
          <>
            <CanvasComponent
              onClick={handleCanvasClick}
              waldoFound={waldoFound}
              waldoPosition={waldoPosition}
            />
            <div className="grid w-2/3 grid-cols-3 mt-2">
              <p>{message}</p>
              {waldoFound && (
                <button
                  onClick={playAgain}
                  className="btn flex w-[200px] items-center justify-center rounded-md bg-blue-300 px-2"
                >
                  Play Again
                </button>
              )}
              <p className="flex justify-end w-full col-start-3">
                Score: {score}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <button
              onClick={() => setGameStart(true)}
              className="px-2 bg-blue-300 rounded-md btn"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

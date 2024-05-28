import { useEffect, useState } from "react";
import CanvasComponent from "./components/canvas";
import HighScore from "./components/high-score";
import Modal from "./components/modal";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [waldoFound, setWaldoFound] = useState(false);
  const [score, setScore] = useState(60);
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
      y <= waldoPosition.y + waldoPosition.height &&
      !waldoFound
    ) {
      setMessage("You found Waldo!");
      setWaldoFound(true);
      setOpenModal(true);
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
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="m-2 flex h-[95dvh] flex-col items-center justify-start  p-2">
        <h1 className="mb-2">Where's Waldo</h1>
        {gameStart ? (
          <>
            <CanvasComponent
              onClick={handleCanvasClick}
              waldoFound={waldoFound}
              waldoPosition={waldoPosition}
            />
            <div className="m-2 grid w-full grid-cols-1 gap-3 md:w-[1280px] md:grid-cols-3">
              <p className="flex items-center justify-center w-full md:justify-start">
                {message}
              </p>
              {waldoFound && (
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={playAgain}
                    className="btn flex items-center justify-center rounded-md bg-blue-300 px-2 md:w-[200px]"
                  >
                    Play Again
                  </button>
                </div>
              )}
              <p className="flex items-center justify-center w-full md:col-start-3 md:justify-end">
                Score: {score}
              </p>
            </div>
            <Modal isVisible={openModal} onClose={closeModal}>
              <div className="flex items-center justify-center gap-2">
                <h2>Congrats!</h2>
                <p>You found Waldo!</p>
              </div>
              <HighScore score={score} />
            </Modal>
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

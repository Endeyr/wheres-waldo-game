import { useState } from "react";
import CanvasComponent from "./components/canvas";

function App() {
  const [message, setMessage] = useState("");
  const [waldoFound, setWaldoFound] = useState(false);
  const waldoPosition = { x: 780, y: 264, width: 20, height: 30 };

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
      setMessage("Try again.");
      setWaldoFound(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-2 m-2">
        <h1>Where's Waldo Game</h1>
        <CanvasComponent
          onClick={handleCanvasClick}
          waldoFound={waldoFound}
          waldoPosition={waldoPosition}
        />
        <p>{message}</p>
      </div>
    </>
  );
}

export default App;

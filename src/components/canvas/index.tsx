import { useEffect, useRef } from "react";
import waldoImage from "../../assets/wheres-waldo.webp";
const CanvasComponent = ({
  onClick,
  waldoPosition,
  waldoFound,
}: {
  onClick: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  waldoPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  waldoFound: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = waldoImage;
        if (ctx) {
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (waldoFound) {
              ctx.strokeStyle = "black";
              ctx.lineWidth = 5;
              ctx.strokeRect(
                waldoPosition.x,
                waldoPosition.y,
                waldoPosition.width,
                waldoPosition.height,
              );
            }
          };
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [waldoFound, waldoPosition]);
  return (
    <canvas
      ref={canvasRef}
      width={1280}
      height={720}
      onClick={onClick}
      style={{ border: "1px solid black" }}
    />
  );
};
export default CanvasComponent;

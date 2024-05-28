import { useEffect, useState } from "react";
import { FormDataType } from "../../types/FormDataType";
import HighScoreForm from "./high-score-form";

const HighScore = ({ score }: { score: number }) => {
  const [allScores, setAllScores] = useState<FormDataType[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => {
    const storedScores = localStorage.getItem("highScores");
    if (storedScores) {
      const parsedScores = JSON.parse(storedScores);
      parsedScores.sort(
        (a: FormDataType, b: FormDataType) => b.score - a.score,
      );
      setAllScores(parsedScores);
    }
  }, []);
  return (
    <div>
      {formSubmitted ? (
        <>
          <h2 className="text-lg font-bold text-center">High Scores</h2>
          <ul className="flex flex-col items-center justify-center w-full gap-2">
            {allScores.map((entry, index) => (
              <li key={index}>
                {entry.name} - {entry.score}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <HighScoreForm
          score={score}
          setFormSubmitted={setFormSubmitted}
          allScores={allScores}
          setAllScores={setAllScores}
        />
      )}
    </div>
  );
};
export default HighScore;

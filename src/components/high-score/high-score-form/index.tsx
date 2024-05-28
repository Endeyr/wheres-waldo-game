import { useEffect, useState } from "react";
import { FormDataType } from "../../../types/FormDataType";

const initialFormData = {
  name: "",
  score: 0,
};

const HighScoreForm = ({
  score,
  setFormSubmitted,
  allScores,
  setAllScores,
}: {
  score: number;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  allScores: FormDataType[];
  setAllScores: React.Dispatch<React.SetStateAction<FormDataType[]>>;
}) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, score }));
  }, [score]);
  useEffect(() => {
    const storedFormData = localStorage.getItem("highScores");
    if (storedFormData) {
      setAllScores(JSON.parse(storedFormData));
    }
  }, [setAllScores]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    const updatedScores = [...allScores, formData];
    setAllScores(updatedScores);
    localStorage.setItem("highScores", JSON.stringify(updatedScores));
    setFormData(initialFormData);
    setFormSubmitted(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 p-2 shadow-md"
    >
      <label htmlFor="name" className="p-2 text-right">
        Enter your name!
        <input
          className="w-full border p-2"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name..."
        />
      </label>
      <input type="hidden" id="score" name="score" value={formData.score} />
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="mr-2 rounded-md border bg-blue-500 p-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default HighScoreForm;

import React from "react";
import { saveData } from "../../data/saveData";

type SavesProps = {
  currentSave: number;
  setCurrentSave: React.Dispatch<React.SetStateAction<number>>;
};

const Saves: React.FC<SavesProps> = (props) => {
  const savesElements = saveData.map((value, index) => {
    return (
      <button>
        {index + 1}
        <button>D</button>
      </button>
    );
  });

  return (
    <div>
      <p>Saves</p>
      {savesElements}
      <button>+</button>
    </div>
  );
};

export default Saves;

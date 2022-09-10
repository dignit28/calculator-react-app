import React from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteDialogue from "./DeleteSaveDialogue";
// Data
import { saveData } from "../../data/saveData";
// Functions
import { updateInputData } from "../../data/saveData";
// Types
import { CurrentVariableState } from "../../App";

type SavesProps = {
  currentSave: number;
  setCurrentSave: React.Dispatch<React.SetStateAction<number>>;
  currentVariable: CurrentVariableState;
};

const Saves: React.FC<SavesProps> = (props) => {
  const [deleteDialogueIsShown, setDeleteDialogueIsShown] =
    React.useState(false);
  const [cursorClickPosition, setCursorClickPosition] = React.useState<
    [number, number]
  >([0, 0]);
  const [assignedFormSave, setAssignedFormSave] = React.useState(-1);

  React.useEffect(() => {
    if (deleteDialogueIsShown === true) {
      const confirmButton: HTMLButtonElement =
        document.querySelector(".confirm-button")!;
      confirmButton.focus();
    }
  }, [deleteDialogueIsShown]);

  const switchSave = (save: number) => {
    const calculatorInputElement: HTMLInputElement =
      document.querySelector(".calculator-input")!;
    const expression = calculatorInputElement.value;

    updateInputData(props.currentSave, props.currentVariable.name, expression);
    props.setCurrentSave(save);
  };

  const openDeleteSaveDialogue = (event: React.MouseEvent) => {
    setDeleteDialogueIsShown(true);
    setCursorClickPosition([event.clientX, event.clientY]);
  };

  const closeDeleteSaveDialogue = () => {
    setDeleteDialogueIsShown(false);
  };

  const deleteSave = (event: React.MouseEvent, save: number) => {
    event.stopPropagation();
    setAssignedFormSave(save);
    openDeleteSaveDialogue(event);
  };

  const addNewSave = () => {
    console.log("Add");
  };

  const savesElements = saveData.map((value, index) => {
    return (
      <button key={uuidv4()} onClick={() => switchSave(index)}>
        {index + 1}
        <button onClick={(event) => deleteSave(event, index)}>D</button>
      </button>
    );
  });

  return (
    <div>
      <p>Saves</p>
      {savesElements}
      <button onClick={addNewSave}>+</button>
      {deleteDialogueIsShown && (
        <DeleteDialogue
          assignedSave={assignedFormSave}
          position={cursorClickPosition}
          closeDeleteSaveDialogue={closeDeleteSaveDialogue}
        />
      )}
    </div>
  );
};

export default Saves;

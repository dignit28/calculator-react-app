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
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
};

const Saves: React.FC<SavesProps> = (props) => {
  const [saves, setSaves] = React.useState(
    saveData.map((value, index) => index)
  );
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

  const updateSaves = () => {
    setSaves(saveData.map((value, index) => index));
  };

  const switchSave = (save: number) => {
    const calculatorInputElement: HTMLInputElement =
      document.querySelector(".calculator-input")!;
    const expression = calculatorInputElement.value;

    updateInputData(props.currentSave, props.currentVariable.name, expression);
    props.setCurrentSave(save);
    props.setCurrentVariable({
      name: saveData[props.currentSave][0].variableName,
      index: 0,
    });
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
    saveData.push([
      {
        variableName: "x",
        variableComment: "Variable x",
        variableChildren: [],
        inputData: {
          displayedValue: "",
          arrayValue: ["caret"],
        },
        computedData: {
          computedFormula: "",
          computedResult: "",
        },
      },
    ]);
    updateSaves();
    switchSave(saves.length);
  };

  const savesElements = saves.map((value) => {
    return (
      <button key={uuidv4()} onClick={() => switchSave(value)}>
        {value + 1}
        <button onClick={(event) => deleteSave(event, value)}>D</button>
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

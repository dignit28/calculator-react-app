import React from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteDialogue from "./DeleteSaveDialogue";
// Data
import { saveData } from "../../data/saveData";
// Functions
import { updateInputData } from "../../data/saveData";
// Types
import { CurrentSaveState, CurrentVariableState } from "../../App";
// Styles
import SavesWrapper from "./Saves.styles";

type SavesProps = {
  currentSave: CurrentSaveState;
  setCurrentSave: React.Dispatch<React.SetStateAction<CurrentSaveState>>;
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

    updateInputData(
      props.currentSave.index,
      props.currentVariable.name,
      expression
    );
    props.setCurrentSave({ index: save });
    props.setCurrentVariable({
      name: saveData[props.currentSave.index][0].variableName,
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
      <li
        className={props.currentSave.index === value ? "selected" : ""}
        key={uuidv4()}
        onClick={() => switchSave(value)}
      >
        <p>{value + 1}</p>
        {saves.length !== 1 ? (
          <i
            className="fa-solid fa-trash"
            onClick={(event) => deleteSave(event, value)}
          ></i>
        ) : (
          ""
        )}
      </li>
    );
  }, this);

  return (
    <div className="saves-component">
      <SavesWrapper className="saves-elements">{savesElements}</SavesWrapper>
      <i className="fa-solid fa-plus add-save-button" onClick={addNewSave}></i>
      {deleteDialogueIsShown && (
        <DeleteDialogue
          assignedSave={assignedFormSave}
          position={cursorClickPosition}
          setCurrentSave={props.setCurrentSave}
          setCurrentVariable={props.setCurrentVariable}
          closeDeleteSaveDialogue={closeDeleteSaveDialogue}
          updateSaves={updateSaves}
        />
      )}
    </div>
  );
};

export default Saves;

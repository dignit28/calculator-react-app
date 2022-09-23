import React from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteSaveDialogue from "./DeleteSaveDialogue";
// Types
import {
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";
// Styles
import SavesWrapper from "./Saves.styles";

type SavesProps = {
  saveData: SaveDataState;
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataState>>;
  currentSave: CurrentSaveState;
  setCurrentSave: React.Dispatch<React.SetStateAction<CurrentSaveState>>;
  currentVariable: CurrentVariableState;
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
  updateInputData: (
    save: number,
    variable: string,
    newInputValue: string
  ) => void;
};

const Saves: React.FC<SavesProps> = (props) => {
  const [saves, setSaves] = React.useState(
    props.saveData.map((value, index) => index)
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

  React.useEffect(() => {
    setSaves(props.saveData.map((value, index) => index));
  }, [props.saveData])

  const switchSave = (save: number) => {
    const calculatorInputElement: HTMLInputElement =
      document.querySelector(".calculator-input")!;
    const expression = calculatorInputElement.value;

    props.updateInputData(
      props.currentSave.index,
      props.currentVariable.name,
      expression
    );
    props.setCurrentSave({ index: save });
    props.setCurrentVariable({
      name: props.saveData[props.currentSave.index][0].variableName,
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
    props.setSaveData((prevSaveData) => {
      return [
        ...prevSaveData,
        [
          {
            variableName: "x",
            variableComment: "",
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
        ],
      ];
    });
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
        <DeleteSaveDialogue
          saveData={props.saveData}
          setSaveData={props.setSaveData}
          assignedSave={assignedFormSave}
          position={cursorClickPosition}
          setCurrentSave={props.setCurrentSave}
          setCurrentVariable={props.setCurrentVariable}
          closeDeleteSaveDialogue={closeDeleteSaveDialogue}
        />
      )}
    </div>
  );
};

export default Saves;

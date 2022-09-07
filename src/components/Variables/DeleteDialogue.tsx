import React from "react";
// Styles
import { DeleteDialogueWrapper, FocusTrap } from "./Variables.styles";
// Data
import { saveData } from "../../data/saveData";
// Functions
import { findVariableIndex, getParentVariables } from "../../data/saveData";
//Types
import { CurrentVariableState } from "../../App";

type DeleteDialogueProps = {
  assignedVariable: string;
  onKeyDown: (e: any) => void;
  onClickOutside: (e: any) => void;
  position: [number, number];
  updateVariables: () => void;
  closeDeleteVariableDialogue: () => void;
  currentVariable: CurrentVariableState;
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
  currentSave: number;
};

const DeleteDialogue: React.FC<DeleteDialogueProps> = (props) => {
  const closeFormCleanup = (variableName: string) => {
    props.updateVariables();
    props.setCurrentVariable({
      name: variableName,
      index: findVariableIndex(props.currentSave, variableName),
    });
    props.closeDeleteVariableDialogue();
  };

  const deleteVariable = () => {
    const variableIndex = findVariableIndex(
      props.currentSave,
      props.assignedVariable
    );
    const parentVariables = getParentVariables(
      props.currentSave,
      props.assignedVariable
    );

    parentVariables.forEach((parent) => {
      const parentSaveData =
        saveData[props.currentSave][
          findVariableIndex(props.currentSave, parent)
        ];
      const indexOfChild = parentSaveData.variableChildren.indexOf(
        props.assignedVariable
      );
      if (indexOfChild > -1) {
        parentSaveData.variableChildren.splice(indexOfChild, 1);
      }

      parentSaveData.computedData = {
        computedFormula: "Invalid input",
        computedResult: "Invalid input",
      };
    });
    console.log(saveData);
    saveData[props.currentSave].splice(variableIndex, 1);

    const indexOfVariableToSet =
      props.assignedVariable === props.currentVariable.name
        ? 0
        : findVariableIndex(props.currentSave, props.currentVariable.name);

    closeFormCleanup(
      saveData[props.currentSave][indexOfVariableToSet].variableName
    );
  };

  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onClickOutside}
    >
      <DeleteDialogueWrapper
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <p>ARE YOU SURE</p>
        <button onClick={props.closeDeleteVariableDialogue}>Cancel</button>
        <button className="confirm-button" onClick={deleteVariable}>
          Confirm
        </button>
      </DeleteDialogueWrapper>
    </FocusTrap>
  );
};

export default DeleteDialogue;

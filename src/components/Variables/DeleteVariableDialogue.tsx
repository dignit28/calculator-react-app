import React from "react";
// Styles
import {
  DeleteDialogueWrapper,
  FocusTrap,
} from "../../misc_styles/Forms.styles";
// Data
import { saveData } from "../../data/saveData";
// Functions
import { findVariableIndex, getParentVariables } from "../../data/saveData";
//Types
import { CurrentSaveState, CurrentVariableState } from "../../App";

type DeleteVariableDialogueProps = {
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
  currentSave: CurrentSaveState;
};

const DeleteVariableDialogue: React.FC<DeleteVariableDialogueProps> = (
  props
) => {
  const closeFormCleanup = (variableName: string) => {
    props.updateVariables();
    props.setCurrentVariable({
      name: variableName,
      index: findVariableIndex(props.currentSave.index, variableName),
    });
    props.closeDeleteVariableDialogue();
  };

  const deleteVariable = () => {
    const variableIndex = findVariableIndex(
      props.currentSave.index,
      props.assignedVariable
    );
    const parentVariables = getParentVariables(
      props.currentSave.index,
      props.assignedVariable
    );

    parentVariables.forEach((parent) => {
      const parentSaveData =
        saveData[props.currentSave.index][
          findVariableIndex(props.currentSave.index, parent)
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
    saveData[props.currentSave.index].splice(variableIndex, 1);

    const indexOfVariableToSet =
      props.assignedVariable === props.currentVariable.name
        ? 0
        : findVariableIndex(
            props.currentSave.index,
            props.currentVariable.name
          );

    closeFormCleanup(
      saveData[props.currentSave.index][indexOfVariableToSet].variableName
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

export default DeleteVariableDialogue;

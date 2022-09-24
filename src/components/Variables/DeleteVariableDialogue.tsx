import React from "react";
// Styles
import { ModalWrapper, FocusTrap } from "../../misc_styles/Modals.styles";
//Types
import {
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";

type DeleteVariableDialogueProps = {
  saveData: SaveDataState;
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataState>>;
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
  findVariableIndex: (save: number, variable: string) => number;
  getParentVariables: (save: number, variable: string) => string[];
};

const DeleteVariableDialogue: React.FC<DeleteVariableDialogueProps> = (
  props
) => {
  const assignedVariableParents = props.getParentVariables(
    props.currentSave.index,
    props.assignedVariable
  );

  const closeFormCleanup = (variableName: string) => {
    props.updateVariables();
    props.setCurrentVariable({
      name: variableName,
      index: props.findVariableIndex(props.currentSave.index, variableName),
    });
    props.closeDeleteVariableDialogue();
  };

  const deleteVariable = () => {
    const variableIndex = props.findVariableIndex(
      props.currentSave.index,
      props.assignedVariable
    );
    const parentVariables = props.getParentVariables(
      props.currentSave.index,
      props.assignedVariable
    );

    parentVariables.forEach((parent) => {
      const parentSaveData =
        props.saveData[props.currentSave.index][
          props.findVariableIndex(props.currentSave.index, parent)
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

    props.setSaveData((prevSaveData) => {
      const newSaveData = [...prevSaveData];
      newSaveData[props.currentSave.index].splice(variableIndex, 1);
      return newSaveData;
    });

    const indexOfVariableToSet =
      props.assignedVariable === props.currentVariable.name
        ? 0
        : props.findVariableIndex(
            props.currentSave.index,
            props.currentVariable.name
          );

    closeFormCleanup(
      props.saveData[props.currentSave.index][indexOfVariableToSet].variableName
    );
  };

  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onClickOutside}
    >
      <ModalWrapper
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <p>Do you want to delete variable {props.assignedVariable}?</p>
        {assignedVariableParents.length === 0 ? (
          <p className="modal-explanatory-text">
            {"\u2713"} No variables are dependent on "{props.assignedVariable}"
          </p>
        ) : (
          <>
            <p className="modal-explanatory-text">
              ! Some variables are dependent on "{props.assignedVariable}":
            </p>
            <p className="modal-explanatory-text modal-variable-list">
              {assignedVariableParents.join(", ")}
            </p>
          </>
        )}
        <button onClick={props.closeDeleteVariableDialogue}>Cancel</button>
        <button className="confirm-button" onClick={deleteVariable}>
          Confirm
        </button>
      </ModalWrapper>
    </FocusTrap>
  );
};

export default DeleteVariableDialogue;

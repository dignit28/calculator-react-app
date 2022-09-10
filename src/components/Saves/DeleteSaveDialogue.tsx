import React from "react";
import { saveData } from "../../data/saveData";
// Types
import { CurrentSaveState, CurrentVariableState } from "../../App";
// Styles
import {
  DeleteDialogueWrapper,
  FocusTrap,
} from "../../misc_styles/Forms.styles";

type DeleteSaveDialogueProps = {
  assignedSave: number;
  position: [number, number];
  closeDeleteSaveDialogue: () => void;
  updateSaves: () => void;
  setCurrentSave: React.Dispatch<React.SetStateAction<CurrentSaveState>>;
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
};

const DeleteSaveDialogue: React.FC<DeleteSaveDialogueProps> = (props) => {
  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        props.closeDeleteSaveDialogue();
        break;
      case "Enter":
        event.preventDefault();
        const confirmButton: HTMLButtonElement =
          document.querySelector(".confirm-button")!;
        confirmButton.click();
        break;
    }
  };

  const onClickOutside = (event: React.SyntheticEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("focus-trap")) {
      props.closeDeleteSaveDialogue();
    }
  };

  const deleteSave = () => {
    saveData.splice(props.assignedSave, 1);
    props.setCurrentSave({ index: 0 });
    props.setCurrentVariable({
      name: saveData[0][0].variableName,
      index: 0,
    });
    props.updateSaves();
    props.closeDeleteSaveDialogue();
  };

  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={onKeyDown}
      onMouseDown={onClickOutside}
    >
      <DeleteDialogueWrapper
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <p>ARE YOU SURE</p>
        <button onClick={props.closeDeleteSaveDialogue}>Cancel</button>
        <button className="confirm-button" onClick={deleteSave}>
          Confirm
        </button>
      </DeleteDialogueWrapper>
    </FocusTrap>
  );
};

export default DeleteSaveDialogue;

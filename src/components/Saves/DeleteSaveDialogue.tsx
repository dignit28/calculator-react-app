import React from "react";
// Types
import {
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";
// Styles
import { ModalWrapper, FocusTrap } from "../../misc_styles/Modals.styles";

type DeleteSaveDialogueProps = {
  saveData: SaveDataState;
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataState>>;
  assignedSave: number;
  position: [number, number];
  closeDeleteSaveDialogue: () => void;
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
    props.setSaveData((prevSaveData) => {
      const newSaveData = [...prevSaveData];
      newSaveData.splice(props.assignedSave, 1);
      return newSaveData;
    });
    props.setCurrentSave({ index: 0 });
    props.setCurrentVariable({
      name: props.saveData[0][0].variableName,
      index: 0,
    });
    props.closeDeleteSaveDialogue();
  };

  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={onKeyDown}
      onMouseDown={onClickOutside}
    >
      <ModalWrapper
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <p>Do you want to delete save {props.assignedSave + 1}?</p>
        <button onClick={props.closeDeleteSaveDialogue}>Cancel</button>
        <button className="confirm-button" onClick={deleteSave}>
          Confirm
        </button>
      </ModalWrapper>
    </FocusTrap>
  );
};

export default DeleteSaveDialogue;

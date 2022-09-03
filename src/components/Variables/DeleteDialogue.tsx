import React from "react";
// Styles
import { DeleteDialogueWrapper, FocusTrap } from "./Variables.styles";

type DeleteDialogueProps = {
  onKeyDown: (e: any) => void;
  onClickOutside: (e: any) => void;
  position: [number, number];
  closeDeleteVariableDialogue: () => void;
};

const DeleteDialogue: React.FC<DeleteDialogueProps> = (props) => {
  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onClickOutside}
    >
      <DeleteDialogueWrapper
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onKeyDown={props.onKeyDown}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <button>Cancel</button>
        <button className="confirm-button">Confirm</button>
      </DeleteDialogueWrapper>
    </FocusTrap>
  );
};

export default DeleteDialogue;

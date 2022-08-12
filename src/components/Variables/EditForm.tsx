import React from "react";
// Styles
import { EditFormWrapper, FocusTrap } from "./EditForm.styles";

type EditFormProps = {
  onKeyDown: (e: any) => void;
  onClickOutside: (e: any) => void;
  position: [number, number];
};

const EditForm: React.FC<EditFormProps> = (props) => {
  return (
    <FocusTrap onKeyDown={props.onKeyDown} onClick={props.onClickOutside}>
      <EditFormWrapper
        className="edit-form"
        cursorX={props.position[0]}
        cursorY={props.position[1]}
      ></EditFormWrapper>
    </FocusTrap>
  );
};

export default EditForm;

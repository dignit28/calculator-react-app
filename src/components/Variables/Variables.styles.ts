import styled from "styled-components";

type EditFormWrapperProps = {
  cursorX: number;
  cursorY: number;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

type DeleteDialogueWrapperProps = {
  cursorX: number;
  cursorY: number;
};

export const EditFormWrapper = styled.form<EditFormWrapperProps>`
  position: fixed;
  border: solid 2px black;
  background-color: white;
  top: ${({ cursorY }) => cursorY}px;
  left: ${({ cursorX }) => cursorX}px;
  height: 200px;
  width: 200px;
`;

export const FocusTrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const DeleteDialogueWrapper = styled.div<DeleteDialogueWrapperProps>`
  position: fixed;
  border: solid 2px black;
  background-color: white;
  top: ${({ cursorY }) => cursorY}px;
  left: ${({ cursorX }) => cursorX}px;
  height: 200px;
  width: 200px;
`;

import styled from "styled-components";

type EditFormWrapperProps = {
  className: string;
  cursorX: number;
  cursorY: number;
};

export const EditFormWrapper = styled.div<EditFormWrapperProps>`
  position: fixed;
  background-color: black;
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
`;

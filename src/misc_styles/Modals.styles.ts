import styled from "styled-components";

type ModalWrapperProps = {
  cursorX: number;
  cursorY: number;
};

export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px rgb(138, 173, 184);
  background-color: rgb(221, 239, 245);
  top: ${({ cursorY }) => cursorY}px;
  left: ${({ cursorX }) => {
    return window.innerWidth - cursorX > 240 ? cursorX : cursorX - 240;
  }}px;
  height: 200px;
  width: 200px;
  padding: 20px;

  p {
    width: 200px;
    margin-bottom: 10px;
  }

  .modal-explanatory-text {
    align-self: flex-start;
  }

  .modal-variable-list {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .variable-name-error-text {
    font-size: 13px;
    color: rgb(198, 95, 123);
  }

  input {
    border: solid 1px rgb(138, 173, 184);
    background-color: rgb(173, 216, 230);
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(58, 62, 65);
    font-weight: bold;
    margin-bottom: 10px;

    :focus {
      outline-color: rgb(110, 138, 147);
    }
  }

  .variable-input-error {
    border: solid 2px rgb(198, 95, 123);

    :focus {
      outline-color: rgb(198, 95, 123);
    }
  }

  button {
    width: 103%;
    margin-top: 10px;
    height: 30px;
    border: solid 1px rgb(138, 173, 184);
    background-color: rgb(173, 216, 230);
    font-size: 14px;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(58, 62, 65);
    font-weight: bold;

    :hover {
      background-color: rgb(138, 173, 184);
      border: solid 1px rgb(110, 138, 147);
    }

    transition: border 250ms, background-color 250ms;
    -webkit-transition: border 250ms, background-color 250ms;
    -moz-transition: border 250ms, background-color 250ms;
    -o-transition: border 250ms, background-color 250ms;
    -ms-transition: border 250ms, background-color 250ms;
  }
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

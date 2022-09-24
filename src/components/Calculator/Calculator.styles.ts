import styled from "styled-components";

export const CalculatorWrapper = styled.div`
  margin: 20px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  textarea {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    border: solid 1px rgb(138, 173, 184);
    background-color: rgb(173, 216, 230);
    font-size: 16px;
    color: rgb(58, 62, 65);
    font-weight: bold;
    resize: none;

    :focus {
      outline-color: rgb(110, 138, 147);
    }
  }
`;

export const ButtonsWrapper = styled.div`
  padding-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  width: 100%;

  button {
    min-height: 2.3em;
    border: solid 1px rgb(138, 173, 184);
    background-color: rgb(173, 216, 230);
    font-size: 18px;
    color: rgb(58, 62, 65);
    font-weight: bold;
    cursor: pointer;

    :hover {
      background-color: rgb(138, 173, 184);
      border: solid 1px rgb(110, 138, 147);
    }

    :active {
      border-width: 6px;
      transition: none;
    }

    transition: border 250ms, background-color 250ms;
    -webkit-transition: border 250ms, background-color 250ms;
    -moz-transition: border 250ms, background-color 250ms;
    -o-transition: border 250ms, background-color 250ms;
    -ms-transition: border 250ms, background-color 250ms;
  }
`;

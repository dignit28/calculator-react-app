import styled from "styled-components";

export const CalculatorWrapper = styled.div`
  margin: 20px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  max-width: 500px;

  input {
    height: 25px;
    border: solid 1px rgb(138, 173, 184);
    background-color: rgb(173, 216, 230);

    :focus {
      outline-color: rgb(110, 138, 147);
    }
  }
`;

export const ButtonsWrapper = styled.div`
  padding-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;

  button {
    min-height: 6vh;
    border: solid 1px rgb(138, 173, 184);
    background-color: rgb(173, 216, 230);
    font-size: 14px;
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

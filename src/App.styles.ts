import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
  }

  .saves-component {
    display: flex;
    align-items: center;
    background-color: rgb(221, 239, 245);
    border-bottom: solid 2px rgb(138, 173, 184);

    .add-save-button {
      padding-left: 3px;
      color: rgb(58, 62, 65);
      font-size: 16px;
      transition: all 250ms;
      -webkit-transition: all 250ms;
      -moz-transition: all 250ms;
      -o-transition: all 250ms;
      -ms-transition: all 250ms;

      :hover {
        cursor: pointer;
        font-size: 18px;
      }
    }
  }

  .variables-component {
    position: fixed;
    height: 100%;
    width: 80px;
    background-color: rgb(221, 239, 245);
    border-right: solid 2px rgb(138, 173, 184);
  }

  .main-content {
    position: fixed;
    left: 82px;
    height: 100%;
    width: 100%;
    height: 100%;
  }

  .calculator-component {
    float: left;
    box-sizing: border-box;
    width: 35%;
    height: 100%;
    border-right: solid 2px rgb(138, 173, 184);
  }

  .formulas-component {
    float: left;
    width: 65%;
    height: 100%;
  }
`;

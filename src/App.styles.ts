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
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(58, 62, 65);
    font-weight: bold;

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
    padding-bottom: 21px;
    background-color: rgb(221, 239, 245);
    border-right: solid 2px rgb(138, 173, 184);
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(58, 62, 65);
    font-weight: bold;
  }
  .main-content {
    position: fixed;
    left: 82px;
    height: 100%;
    width: 100%;
    background-color: rgb(248, 248, 248);
    z-index: -1;
  }

  .calculator-component {
    float: left;
    box-sizing: border-box;
    width: 35%;
    height: 100%;
    border-right: solid 2px rgb(138, 173, 184);
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(58, 62, 65);
    font-weight: bold;
  }

  .formulas-component {
    float: left;
    width: 65%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    .main-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      overflow-y: auto;
    }

    .calculator-component {
      float: none;
      width: 100%;
      padding-right: 82px;
      padding-bottom: 20px;
      border: none;
      border-bottom: solid 2px rgb(138, 173, 184);
    }

    .formulas-component {
      float: none;
      width: 100%;
    }
  }
`;

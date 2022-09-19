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
`;

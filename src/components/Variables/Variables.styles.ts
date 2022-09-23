import styled from "styled-components";

const VariablesWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 21px;
    overflow-y: auto;

    li {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      background-color: rgb(173, 216, 230);
      border-bottom: solid 1px rgb(138, 173, 184);
      transition: all 250ms;
      -webkit-transition: all 250ms;
      -moz-transition: all 250ms;
      -o-transition: all 250ms;
      -ms-transition: all 250ms;
      cursor: pointer;
      overflow: hidden;

      :hover {
        background-color: rgb(138, 173, 184);
      }

      :last-child {
        justify-content: center;
        :hover {
          i {
            font-size: 16px;
          }
        }
      }

      p {
        margin: 0 auto 0 4px;
        overflow: hidden;
      }

      i {
        font-size: 14px;
        margin-right: 4px;
        transition: all 250ms;
        -webkit-transition: all 250ms;
        -moz-transition: all 250ms;
        -o-transition: all 250ms;
        -ms-transition: all 250ms;
        cursor: pointer;

        :hover {
          font-size: 16px;
        }
      }
    }

    .selected {
      background-color: rgb(138, 173, 184);
      cursor: default;
    }
  }
`;

export default VariablesWrapper;

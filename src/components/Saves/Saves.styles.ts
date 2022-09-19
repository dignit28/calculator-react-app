import styled from "styled-components";

const SavesWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  background-color: rgb(221, 239, 245);
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  height: 19px;
  overflow: hidden;

  li {
    width: 54px;
    padding: 0 3px;
    float: left;
    display: flex;
    align-items: center;
    background-color: rgb(173, 216, 230);
    border-radius: 0 5px 0 0;
    border: solid 1px rgb(138, 173, 184);
    border-bottom: none;
    transition: all 250ms;
    -webkit-transition: all 250ms;
    -moz-transition: all 250ms;
    -o-transition: all 250ms;
    -ms-transition: all 250ms;
    cursor: pointer;
    overflow: hidden;

    :hover {
      background-color: rgb(138, 173, 184);
      border: solid 1px rgb(110, 138, 147);
      border-bottom: none;
    }

    p {
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(58, 62, 65);
      font-weight: bold;
      margin-right: auto;
      overflow: hidden;
    }

    i {
      color: rgb(58, 62, 65);
      font-size: 14px;
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
    border: solid 1px rgb(110, 138, 147);
    border-bottom: none;
    cursor: default;

    :hover {
      background-color: rgb(138, 173, 184);
      border: solid 1px rgb(110, 138, 147);
      border-bottom: none;
    }
  }
`;

export default SavesWrapper;

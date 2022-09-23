import styled from "styled-components";

export const ChildVariablesWrapper = styled.ul`
  list-style: none;
  background-color: #fff;
  margin-bottom: 60px;
  padding-top: 20px;
  padding-right: 20px;
  font-family: "Times New Roman", Times, serif;
  color: #000;
  font-style: italic;
  font-weight: bold;
  overflow-y: auto;

  li {
    margin-left: -20px;
    padding-bottom: 20px;
    word-wrap: break-word;
  }
`;

export const FormulasWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 20px;
  padding-right: 82px;

  p {
    padding: 20px;
    font-weight: 900;
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    background-color: #fff;
  }

  .mathjax-formula {
    background-color: #fff;
    padding: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 0;
  }
`;

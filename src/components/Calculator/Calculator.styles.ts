import styled from "styled-components";

export const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

export const ButtonsWrapper = styled.div`
  padding-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
`;

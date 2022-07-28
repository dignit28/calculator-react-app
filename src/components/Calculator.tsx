import React from "react";
import { CalculatorWrapper } from "./Calculator.styles";
import buttons from "../data/buttons";

const Calculator = () => {
  const buttonElements = buttons.map((button) => (
    <button>{button.text}</button>
  ));

  return (
    <CalculatorWrapper className="calculator">
      <input type="text" className="calculator-input" />
      {buttonElements}
    </CalculatorWrapper>
  );
};

export default Calculator;

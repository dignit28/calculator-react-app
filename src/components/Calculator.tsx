import React from "react";
import { CalculatorWrapper } from "./Calculator.styles";

const Calculator = () => {
  return (
    <CalculatorWrapper className="calculator">
      <input type="text" className="calculator-input" />
      <button>1</button>
    </CalculatorWrapper>
  );
};

export default Calculator;

import React from "react";
// Styles
import { CalculatorWrapper } from "./Calculator.styles";
// Data
import buttons from "../data/buttons";

const Calculator = () => {
  const [expression, setExpression] = React.useState({
    displayedValue: "",
    arrayValue: ["caret"],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setExpression((prevExpression) => {
      if (typeof event.target.selectionStart === "number") {
        const newDisplayedValue = event.target.value.replace(
          /[^0-9a-z+\-*/^.)(]+/gi,
          ""
        );
        const newArrayValue = newDisplayedValue.split("");
        newArrayValue.splice(event.target.selectionStart, 0, "caret");
        return {
          arrayValue: newArrayValue,
          displayedValue: newDisplayedValue,
        };
      } else {
        console.log("Input field was not selected while changing it");
        return prevExpression;
      }
    });
  };

  const handleButtonClick = (value: string): void => {
    switch (value) {
      case "evaluate": // Process evaluation
        console.log("pressed eval button");
        break;
      default: // Add input
        setExpression((prevExpression) => {
          const newArrayValue = [...prevExpression.arrayValue];
          console.log("here");
          newArrayValue.splice(
            prevExpression.arrayValue.indexOf("caret"),
            0,
            value
          );
          const newDisplayedValue = newArrayValue
            .filter((element) => element !== "caret")
            .join("");
          return {
            arrayValue: newArrayValue,
            displayedValue: newDisplayedValue,
          };
        });
        break;
    }
  };

  const handleInputClick = (
    event: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    setExpression((prevExpression) => {
      if (typeof target.selectionStart === "number") {
        const newArrayValue = prevExpression.arrayValue.filter(
          (element) => element !== "caret"
        );
        newArrayValue.splice(target.selectionStart, 0, "caret");
        return {
          ...prevExpression,
          arrayValue: newArrayValue,
        };
      } else {
        console.log("Input field was not selected while changing it");
        return prevExpression;
      }
    });
  };

  const buttonElements = buttons.map((button) => (
    <button key={button.id} onClick={() => handleButtonClick(button.value)}>
      {button.text}
    </button>
  ));

  return (
    <CalculatorWrapper className="calculator">
      <input
        type="text"
        className="calculator-input"
        onChange={handleChange}
        onClick={handleInputClick}
        value={expression.displayedValue}
      />
      {buttonElements}
    </CalculatorWrapper>
  );
};

export default Calculator;

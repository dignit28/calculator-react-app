import React from "react";
// Styles
import { CalculatorWrapper } from "./Calculator.styles";
// Functions
import validateExpression from "../math_utility/validateExpression";
// Data
import buttons from "../data/buttons";

const Calculator = () => {
  const [expression, setExpression] = React.useState({
    displayedValue: "",
    arrayValue: ["caret"],
  });

  const inputField: HTMLInputElement | null =
    document.querySelector(".calculator-input");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setExpression((prevExpression) => {
      if (typeof event.target.selectionStart === "number") {
        const newDisplayedValue: string = event.target.value.replace(
          /[^0-9a-z+\-*/^.)(]+/gi,
          ""
        );
        const newArrayValue: string[] = newDisplayedValue.split("");
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
        if (inputField !== null) {
          console.log(validateExpression(inputField.value));
        } else {
          console.log("Cannot find input field");
        }
        break;
      default: // Add input
        setExpression((prevExpression) => {
          const newArrayValue: string[] = [...prevExpression.arrayValue];
          console.log("here");
          newArrayValue.splice(
            prevExpression.arrayValue.indexOf("caret"),
            0,
            value
          );
          const newDisplayedValue: string = newArrayValue
            .filter((element: string) => element !== "caret")
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
        const newArrayValue: string[] = prevExpression.arrayValue.filter(
          (element: string) => element !== "caret"
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

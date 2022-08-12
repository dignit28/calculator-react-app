import React from "react";
// Styles
import { CalculatorWrapper } from "./Calculator.styles";
// Functions
import {
  validateExpression,
  validateVariables,
} from "../../math_utility/validateExpression";
import {
  updateInputData,
  saveData,
  findVariableIndex,
} from "../../data/saveData";
import evaluateVariable from "../../math_utility/evaluateVariable";
// Data
import buttons from "../../data/buttons";
// Types
import { ExpressionState, FormulaState } from "../../App";

type CalculatorProps = {
  expression: ExpressionState;
  setExpression: React.Dispatch<React.SetStateAction<ExpressionState>>;
  setFormula: React.Dispatch<React.SetStateAction<FormulaState>>;
  currentVariable: string;
};

const Calculator: React.FC<CalculatorProps> = (props) => {
  const inputField: HTMLInputElement | null =
    document.querySelector(".calculator-input");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newDisplayedValue: string = event.target.value.replace(
      /[^0-9a-z+\-*/^.)(]+/gi,
      ""
    );
    const newArrayValue: string[] = newDisplayedValue.split("");
    newArrayValue.splice(event.target.selectionStart!, 0, "caret");
    props.setExpression({
      arrayValue: newArrayValue,
      displayedValue: newDisplayedValue,
    });
  };

  const handleButtonClick = (value: string): void => {
    switch (value) {
      case "evaluate": // Process evaluation
        const expressionToCalculate = inputField!.value;
        if (
          validateExpression(expressionToCalculate) &&
          validateVariables(props.currentVariable, expressionToCalculate)
        ) {
          const resultingFormula = evaluateVariable(
            props.currentVariable,
            expressionToCalculate
          );
          // After evaluation finished, evaluate dependent variables
          // First add every parent of every dependent variable into array using recursion
          // Duplicate variables will be removed later
          const currentSaveVariables = saveData[0].map((variableData) => {
            return variableData.variableName;
          });
          const evaluationArrayWithDuplicates: string[] = [];
          const addParentsToArray = (childVariable: string) => {
            currentSaveVariables.forEach((parentVariable) => {
              if (
                saveData[0][
                  findVariableIndex(parentVariable)
                ].variableChildren.includes(childVariable)
              ) {
                evaluationArrayWithDuplicates.push(parentVariable);
                addParentsToArray(parentVariable);
              }
            });
          };

          addParentsToArray(props.currentVariable);

          console.log("EVAL Q DUPL ", evaluationArrayWithDuplicates);

          // Now create array without duplicates by popping the one with duplicates
          // That way least dependent, lower-order variables will be evaluated first
          // And higher-order variables will be evaluated last
          const evaluationArray: string[] = [];

          while (evaluationArrayWithDuplicates.length !== 0) {
            const poppedParent = evaluationArrayWithDuplicates.pop();
            if (!evaluationArray.includes(poppedParent!)) {
              evaluationArray.unshift(poppedParent!);
            }
          }

          console.log("EVAL Q ", evaluationArray);

          // Finally evaluate every dependent variable in order
          while (evaluationArray.length !== 0) {
            const currentVariable = evaluationArray.shift();
            evaluateVariable(
              currentVariable!,
              saveData[0][findVariableIndex(currentVariable!)].formulaData
                .displayedFormula
            );
          }

          // Lastly, update current formula state
          props.setFormula(resultingFormula);
        } else {
          props.setFormula((prevFormula) => {
            return {
              ...prevFormula,
              result: "Invalid input",
            };
          });
        }
        updateInputData(0, props.currentVariable, props.expression);
        break;
      default: // Add input
        props.setExpression((prevExpression) => {
          const newArrayValue: string[] = [...prevExpression.arrayValue];
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
    props.setExpression((prevExpression) => {
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
        value={props.expression.displayedValue}
      />
      {buttonElements}
    </CalculatorWrapper>
  );
};

export default Calculator;

import React from "react";
// Styles
import { CalculatorWrapper, ButtonsWrapper } from "./Calculator.styles";
// Functions
import {
  validateExpression,
  validateVariables,
} from "../../math_utility/validateExpression";
import {
  updateInputData,
  updateFormulaData,
  saveData,
  findVariableIndex,
  getParentVariables,
} from "../../data/saveData";
import evaluateVariable from "../../math_utility/evaluateVariable";
// Data
import buttons from "../../data/buttons";
// Types
import {
  ExpressionState,
  ComputedFormulaState,
  CurrentSaveState,
  CurrentVariableState,
} from "../../App";

type CalculatorProps = {
  setComputedFormula: React.Dispatch<
    React.SetStateAction<ComputedFormulaState>
  >;
  currentSave: CurrentSaveState;
  currentVariable: CurrentVariableState;
};

const Calculator: React.FC<CalculatorProps> = (props) => {
  const [expression, setExpression] = React.useState<ExpressionState>(
    saveData[props.currentSave.index][props.currentVariable.index].inputData
  );

  React.useEffect(() => {
    setExpression(
      saveData[props.currentSave.index][props.currentVariable.index].inputData
    );
  }, [props.currentVariable, props.currentSave]);

  const inputField: HTMLInputElement | null =
    document.querySelector(".calculator-input");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newDisplayedValue: string = event.target.value.replace(
      /[^0-9a-z+\-*/^.)(]+/gi,
      ""
    );
    const newArrayValue: string[] = newDisplayedValue.split("");
    newArrayValue.splice(event.target.selectionStart!, 0, "caret");
    setExpression({
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
          validateVariables(
            props.currentSave.index,
            props.currentVariable.name,
            expressionToCalculate
          )
        ) {
          const resultingFormula = evaluateVariable(
            props.currentSave.index,
            props.currentVariable.name,
            expressionToCalculate
          );

          const evaluationArray = getParentVariables(
            props.currentSave.index,
            props.currentVariable.name
          );

          while (evaluationArray.length !== 0) {
            const currentVariable = evaluationArray.shift();
            evaluateVariable(
              props.currentSave.index,
              currentVariable!,
              saveData[props.currentSave.index][
                findVariableIndex(props.currentSave.index, currentVariable!)
              ].computedData.computedFormula
            );
          }

          props.setComputedFormula(resultingFormula);
        } else {
          const invalidFormulaData = {
            computedFormula: "Invalid input",
            computedResult: "Invalid input",
          };
          updateFormulaData(
            props.currentSave.index,
            props.currentVariable.name,
            invalidFormulaData
          );
          props.setComputedFormula(invalidFormulaData);
        }
        updateInputData(
          props.currentSave.index,
          props.currentVariable.name,
          expression.displayedValue
        );
        break;
      default: // Add input
        setExpression((prevExpression) => {
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
    <div className="calculator-component">
      <CalculatorWrapper className="calculator">
        <input
          type="text"
          className="calculator-input"
          onChange={handleChange}
          onClick={handleInputClick}
          value={expression.displayedValue}
        />
        <ButtonsWrapper>{buttonElements}</ButtonsWrapper>
      </CalculatorWrapper>
    </div>
  );
};

export default Calculator;

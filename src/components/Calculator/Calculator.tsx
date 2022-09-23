import React from "react";
// Styles
import { CalculatorWrapper, ButtonsWrapper } from "./Calculator.styles";
// Functions
import {
  validateExpression,
  validateVariables,
} from "../../math_utility/validateExpression";
import evaluateVariable from "../../math_utility/evaluateVariable";
// Data
import buttons from "../../data/buttons";
// Types
import {
  ExpressionState,
  ComputedFormulaState,
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";

type CalculatorProps = {
  saveData: SaveDataState;
  setComputedFormula: React.Dispatch<
    React.SetStateAction<ComputedFormulaState>
  >;
  currentSave: CurrentSaveState;
  currentVariable: CurrentVariableState;
  updateInputData: (
    save: number,
    variable: string,
    newInputValue: string
  ) => void;
  findVariableIndex: (save: number, variable: string) => number;
  updateFormulaData: (
    save: number,
    variable: string,
    newComputedData: ComputedFormulaState
  ) => void;
  updateVariableChildren: (
    save: number,
    parentVariable: string,
    expression: string
  ) => void;
  getParentVariables: (save: number, variable: string) => string[];
};

const Calculator: React.FC<CalculatorProps> = (props) => {
  const [expression, setExpression] = React.useState<ExpressionState>(
    props.saveData[props.currentSave.index][props.currentVariable.index]
      .inputData
  );

  React.useEffect(() => {
    setExpression(
      props.saveData[props.currentSave.index][props.currentVariable.index]
        .inputData
    );
  }, [props.currentVariable, props.currentSave]);

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
        const expressionToCalculate = expression.displayedValue;
        if (
          validateExpression(expressionToCalculate) &&
          validateVariables(
            props.currentSave.index,
            props.currentVariable.name,
            expressionToCalculate,
            props.findVariableIndex,
            props.updateVariableChildren,
            props.saveData
          )
        ) {
          const resultingFormula = evaluateVariable(
            props.currentSave.index,
            props.currentVariable.name,
            expressionToCalculate,
            props.updateFormulaData,
            props.findVariableIndex,
            props.saveData
          );

          const evaluationArray = props.getParentVariables(
            props.currentSave.index,
            props.currentVariable.name
          );

          while (evaluationArray.length !== 0) {
            const currentVariable = evaluationArray.shift();
            evaluateVariable(
              props.currentSave.index,
              currentVariable!,
              props.saveData[props.currentSave.index][
                props.findVariableIndex(
                  props.currentSave.index,
                  currentVariable!
                )
              ].computedData.computedFormula,
              props.updateFormulaData,
              props.findVariableIndex,
              props.saveData
            );
          }

          props.setComputedFormula(resultingFormula);
        } else {
          const invalidFormulaData = {
            computedFormula: "Invalid input",
            computedResult: "Invalid input",
          };
          props.updateFormulaData(
            props.currentSave.index,
            props.currentVariable.name,
            invalidFormulaData
          );
          props.setComputedFormula(invalidFormulaData);
        }
        props.updateInputData(
          props.currentSave.index,
          props.currentVariable.name,
          expression.displayedValue
        );
        break;
      case "delete": // Remove input
        const inputField: HTMLInputElement =
          document.querySelector(".calculator-input")!;
        setExpression((prevExpression) => {
          if (prevExpression.arrayValue.indexOf("caret") === 0) {
            return prevExpression;
          }
          const newArrayValue: string[] = [...prevExpression.arrayValue];
          newArrayValue.splice(
            prevExpression.arrayValue.indexOf("caret") - 1,
            1
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

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Left":
      case "ArrowLeft":
        setExpression((prevExpression) => {
          if (prevExpression.arrayValue.indexOf("caret") === 0) {
            return prevExpression;
          }

          const newArrayValue: string[] = [...prevExpression.arrayValue];
          const oldCaretIndex: number =
            prevExpression.arrayValue.indexOf("caret");
          newArrayValue.splice(oldCaretIndex, 1);
          newArrayValue.splice(oldCaretIndex - 1, 0, "caret");
          return {
            ...prevExpression,
            arrayValue: newArrayValue,
          };
        });
        break;
      case "Right":
      case "ArrowRight":
        setExpression((prevExpression) => {
          if (
            prevExpression.arrayValue.indexOf("caret") ===
            prevExpression.arrayValue.length
          ) {
            return prevExpression;
          }

          const newArrayValue: string[] = [...prevExpression.arrayValue];
          const oldCaretIndex: number =
            prevExpression.arrayValue.indexOf("caret");
          newArrayValue.splice(oldCaretIndex, 1);
          newArrayValue.splice(oldCaretIndex + 1, 0, "caret");
          return {
            ...prevExpression,
            arrayValue: newArrayValue,
          };
        });
        break;
    }
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
          onKeyDown={onKeyDown}
        />
        <ButtonsWrapper>{buttonElements}</ButtonsWrapper>
      </CalculatorWrapper>
    </div>
  );
};

export default Calculator;

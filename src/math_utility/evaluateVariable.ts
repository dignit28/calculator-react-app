import switchVariablesToValues from "../math_utility/switchVariablesToValues";
import { calculateRPN } from "../math_utility/evaluationRPN";
import { ComputedFormulaState, SaveDataState } from "../App";

export default function evaluateVariable(
  save: number,
  currentVariable: string,
  expressionToCalculate: string,
  updateFormulaData: (
    save: number,
    variable: string,
    newComputedData: ComputedFormulaState
  ) => void,
  findVariableIndex: (save: number, variable: string) => number,
  saveData: SaveDataState
): [ComputedFormulaState, string] {
  const expressionToCalculateOnlyValues = switchVariablesToValues(
    save,
    expressionToCalculate,
    findVariableIndex,
    saveData
  );
  const [finalResult, errorMessage] = calculateRPN(
    expressionToCalculateOnlyValues
  );
  const resultingFormula = {
    computedFormula: expressionToCalculate,
    computedResult: Number.isNaN(finalResult)
      ? "Invalid input"
      : finalResult.toString(),
  };

  // After evaluation finished, update data
  updateFormulaData(save, currentVariable, resultingFormula);

  // Storing this value is not important unless there is a need to update current state
  return [resultingFormula, errorMessage];
}

import switchVariablesToValues from "../math_utility/switchVariablesToValues";
import { calculateRPN } from "../math_utility/evaluationRPN";
import { ComputedFormulaState } from "../App";

export default function evaluateVariable(
  save: number,
  currentVariable: string,
  expressionToCalculate: string,
  updateFormulaData: (
    save: number,
    variable: string,
    newComputedData: ComputedFormulaState
  ) => void,
  setLocalVariableValue: (variable: string, value: string) => void,
  getLocalVariableValue: (variable: string) => string
): [ComputedFormulaState, string] {
  const expressionToCalculateOnlyValues = switchVariablesToValues(
    expressionToCalculate,
    getLocalVariableValue
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
  setLocalVariableValue(currentVariable, resultingFormula.computedResult);
  updateFormulaData(save, currentVariable, resultingFormula);

  // Storing this value is not important unless there is a need to update current state
  return [resultingFormula, errorMessage];
}

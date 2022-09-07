import switchVariablesToValues from "../math_utility/switchVariablesToValues";
import { calculateRPN } from "../math_utility/evaluationRPN";
import { updateFormulaData } from "../data/saveData";

export default function evaluateVariable(
  save: number,
  currentVariable: string,
  expressionToCalculate: string
) {
  const expressionToCalculateOnlyValues = switchVariablesToValues(
    save,
    expressionToCalculate
  );
  const finalResult = calculateRPN(expressionToCalculateOnlyValues);
  const resultingFormula = {
    computedFormula: expressionToCalculate,
    computedResult: Number.isNaN(finalResult)
      ? "Invalid input"
      : finalResult.toString(),
  };

  // After evaluation finished, update data
  updateFormulaData(save, currentVariable, resultingFormula);

  // Storing this value is not important unless there is a need to update current state
  return resultingFormula;
}

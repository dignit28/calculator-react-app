import switchVariablesToValues from "../math_utility/switchVariablesToValues";
import { calculateRPN } from "../math_utility/evaluationRPN";
import { updateFormulaData } from "../data/saveData";

export default function evaluateVariable(
  currentVariable: string,
  expressionToCalculate: string
) {
  const expressionToCalculateOnlyValues = switchVariablesToValues(
    expressionToCalculate
  );
  const finalResult = calculateRPN(expressionToCalculateOnlyValues);
  const resultingFormula = {
    displayedFormula: expressionToCalculate,
    result: Number.isNaN(finalResult)
      ? "Invalid input"
      : finalResult.toString(),
  };

  // After evaluation finished, update data
  updateFormulaData(0, currentVariable, resultingFormula);

  // Storing this value is not important unless there is a need to update current state
  return resultingFormula;
}

import { saveData, findVariableIndex } from "../data/saveData";
import { BANNED_VARIABLE_NAMES } from "../data/bannedVariableNames";

export default function switchVariablesToValues(save: number, expression: string): string {
  const arrayedExpression = expression.split("");

  const arrayedExpressionWithValues = arrayedExpression.map((token) => {
    if (token.match(/^[a-z]$/i) && !BANNED_VARIABLE_NAMES.includes(token)) {
      return saveData[save][findVariableIndex(save, token)].computedData.computedResult;
    } else {
      return token;
    }
  });

  return arrayedExpressionWithValues.join("");
}

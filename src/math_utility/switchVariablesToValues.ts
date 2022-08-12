import { saveData } from "../data/saveData";
import { BANNED_VARIABLE_NAMES } from "../data/bannedVariableNames";

export default function switchVariablesToValues(expression: string): string {
  const arrayedExpression = expression.split("");

  const arrayedExpressionWithValues = arrayedExpression.map((token) => {
    if (token.match(/^[a-z]$/i) && !BANNED_VARIABLE_NAMES.includes(token)) {
      return saveData[0][token].formulaData.result;
    } else {
      return token;
    }
  });

  return arrayedExpressionWithValues.join("");
}

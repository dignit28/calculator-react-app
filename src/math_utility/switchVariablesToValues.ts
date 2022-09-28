import { BANNED_VARIABLE_NAMES } from "../data/bannedVariableNames";

export default function switchVariablesToValues(
  expression: string,
  getLocalVariableValue: (variable: string) => string
): string {
  const arrayedExpression = expression.split("");

  const arrayedExpressionWithValues = arrayedExpression.map((token) => {
    if (token.match(/^[a-z]$/i) && !BANNED_VARIABLE_NAMES.includes(token)) {
      return getLocalVariableValue(token);
    } else {
      return token;
    }
  });

  return arrayedExpressionWithValues.join("");
}
// Enums
import { ExpressionTokenType } from "../utility/enums";

function validateExpression(expression: string): boolean {
  const arrayedExpression: string[] = expression.split("");
  let openingParenthesis: number = 0;

  interface Token {
    tokenType: ExpressionTokenType;
    decimalPointUsed: Boolean;
  }

  let prevToken: Token = {
    tokenType: ExpressionTokenType.BEGINNING,
    decimalPointUsed: false,
  };
  try {
    arrayedExpression.forEach((token: string) => {
      switch (token) {
        case "-":
          prevToken.tokenType = ExpressionTokenType.OPERATOR;
          prevToken.decimalPointUsed = false;
          break;
        case "+":
        case "*":
        case "/":
        case "^":
          if (
            prevToken.tokenType !== ExpressionTokenType.NUMBER &&
            prevToken.tokenType !== ExpressionTokenType.RIGHT_PARENTHESIS
          ) {
            throw new Error("Binary operator must be after a number or a right parenthesis");
          }
          prevToken.tokenType = ExpressionTokenType.OPERATOR;
          prevToken.decimalPointUsed = false;
          break;
        case "(":
          if (
            prevToken.tokenType === ExpressionTokenType.NUMBER ||
            prevToken.tokenType === ExpressionTokenType.DECIMAL_POINT ||
            prevToken.tokenType === ExpressionTokenType.RIGHT_PARENTHESIS
          ) {
            throw new Error(
              "Left parenthesis can't be after by number, decimal point of right parenthesis"
            );
          }
          openingParenthesis++;
          prevToken.tokenType = ExpressionTokenType.LEFT_PARENTHESIS;
          prevToken.decimalPointUsed = false;
          break;
        case ")":
          if (openingParenthesis <= 0) {
            throw new Error("Detected non matching parenthesis");
          } else if (prevToken.tokenType !== ExpressionTokenType.NUMBER) {
            throw new Error("Right parenthesis must be after a number");
          }
          openingParenthesis--;
          prevToken.tokenType = ExpressionTokenType.RIGHT_PARENTHESIS;
          prevToken.decimalPointUsed = false;
          break;
        case ".":
          if (prevToken.decimalPointUsed === true) {
            throw new Error("Detected multiple decimal points in a number");
          } else if (prevToken.tokenType !== ExpressionTokenType.NUMBER) {
            throw new Error("Decimal point must be between numbers");
          }
          prevToken.tokenType = ExpressionTokenType.DECIMAL_POINT;
          prevToken.decimalPointUsed = true;
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          if (prevToken.tokenType === ExpressionTokenType.RIGHT_PARENTHESIS) {
            throw new Error("Number can't be after right parenthesis");
          }
          prevToken.tokenType = ExpressionTokenType.NUMBER;
          break;
      }
    });
    if (openingParenthesis !== 0) {
      throw new Error("Detected non matching parenthesis");
    }
    if (
      prevToken.tokenType !== ExpressionTokenType.RIGHT_PARENTHESIS &&
      prevToken.tokenType !== ExpressionTokenType.NUMBER
    ) {
      throw new Error(
        "expression must end with a right parenthesis or a number"
      );
    }
  } catch (errorMessage) {
    console.log(errorMessage);
    return false;
  }
  return true;
}

export default validateExpression;

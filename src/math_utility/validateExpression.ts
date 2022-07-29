import { expressionTokenType } from "../utility/enums";

function validateExpression(expression: string): boolean {
  const arrayedExpression = expression.split("");
  let openingParenthesis = 0;
  console.log(arrayedExpression);

  interface token {
    tokenType: expressionTokenType;
    decimalPointUsed: Boolean;
  }

  let prevToken: token = {
    tokenType: expressionTokenType.BEGINNING,
    decimalPointUsed: false,
  };
  try {
    arrayedExpression.forEach((token) => {
      switch (token) {
        case "-":
          prevToken.tokenType = expressionTokenType.OPERATOR;
          prevToken.decimalPointUsed = false;
          break;
        case "+":
        case "*":
        case "/":
        case "^":
          if (
            prevToken.tokenType !== expressionTokenType.NUMBER &&
            prevToken.tokenType !== expressionTokenType.RIGHT_PARENTHESIS
          ) {
            throw "Binary operator must be after a number or a right parenthesis";
          }
          prevToken.tokenType = expressionTokenType.OPERATOR;
          prevToken.decimalPointUsed = false;
          break;
        case "(":
          if (
            prevToken.tokenType === expressionTokenType.NUMBER ||
            prevToken.tokenType === expressionTokenType.DECIMAL_POINT ||
            prevToken.tokenType === expressionTokenType.RIGHT_PARENTHESIS
          ) {
            throw "Left parenthesis can't be after by number, decimal point of right parenthesis";
          }
          openingParenthesis++;
          prevToken.tokenType = expressionTokenType.LEFT_PARENTHESIS;
          prevToken.decimalPointUsed = false;
          break;
        case ")":
          if (openingParenthesis <= 0) {
            throw "Detected non matching parenthesis";
          } else if (prevToken.tokenType !== expressionTokenType.NUMBER) {
            throw "Right parenthesis must be after a number";
          }
          openingParenthesis--;
          prevToken.tokenType = expressionTokenType.RIGHT_PARENTHESIS;
          prevToken.decimalPointUsed = false;
          break;
        case ".":
          if (prevToken.decimalPointUsed === true) {
            throw "Detected multiple decimal points in a number";
          } else if (prevToken.tokenType !== expressionTokenType.NUMBER) {
            throw "Decimal point must be between numbers";
          }
          prevToken.tokenType = expressionTokenType.DECIMAL_POINT;
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
          if (prevToken.tokenType === expressionTokenType.RIGHT_PARENTHESIS) {
            throw "Number can't be after right parenthesis";
          }
          prevToken.tokenType = expressionTokenType.NUMBER;
          break;
      }
    });
    if (openingParenthesis !== 0) {
      throw "Detected non matching parenthesis";
    }
    if (
      prevToken.tokenType !== expressionTokenType.RIGHT_PARENTHESIS &&
      prevToken.tokenType !== expressionTokenType.NUMBER
    ) {
      throw "expression must end with a right parenthesis or a number";
    }
  } catch (errorMessage) {
    console.log(errorMessage);
    return false;
  }
  return true;
}

export default validateExpression;

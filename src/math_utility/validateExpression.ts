function validateExpression(expression: string): boolean {
  const arrayedExpression = expression.split("");
  let openingParenthesis = 0;
  console.log(arrayedExpression);
  let prevToken = {
    tokenType: "beginning",
    decimalPointUsed: false,
  };
  try {
    arrayedExpression.forEach((token) => {
      switch (token) {
        case "-":
          prevToken.tokenType = "operator";
          prevToken.decimalPointUsed = false;
          break;
        case "+":
        case "*":
        case "/":
        case "^":
          if (
            prevToken.tokenType !== "number" &&
            prevToken.tokenType !== "rightParenthesis"
          ) {
            throw "Binary operator must be after a number or a right parenthesis";
          }
          prevToken.tokenType = "operator";
          prevToken.decimalPointUsed = false;
          break;
        case "(":
          if (
            prevToken.tokenType === "number" ||
            prevToken.tokenType === "decimalPoint" ||
            prevToken.tokenType === "rightParenthesis"
          ) {
            throw "Left parenthesis can't be after by number, decimal point of right parenthesis";
          }
          openingParenthesis++;
          prevToken.tokenType = "leftParenthesis";
          prevToken.decimalPointUsed = false;
          break;
        case ")":
          if (openingParenthesis <= 0) {
            throw "Detected non matching parenthesis";
          } else if (prevToken.tokenType !== "number") {
            throw "Right parenthesis must be after a number";
          }
          openingParenthesis--;
          prevToken.tokenType = "rightParenthesis";
          prevToken.decimalPointUsed = false;
          break;
        case ".":
          if (prevToken.decimalPointUsed === true) {
            throw "Detected multiple decimal points in a number";
          } else if (prevToken.tokenType !== "number") {
            throw "Decimal point must be between numbers";
          }
          prevToken.tokenType = "decimalPoint";
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
          if (prevToken.tokenType === "rightParenthesis") {
            throw "Number can't be after right parenthesis";
          }
          prevToken.tokenType = "number";
          break;
      }
    });
    if (openingParenthesis !== 0) {
      throw "Detected non matching parenthesis";
    }
    if (
      prevToken.tokenType !== "rightParenthesis" &&
      prevToken.tokenType !== "number"
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

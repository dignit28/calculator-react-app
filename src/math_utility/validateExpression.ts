// Enums
import { ExpressionTokenType } from "../utility/enums";
// Data
import { BANNED_VARIABLE_NAMES } from "../data/bannedVariableNames";
import { saveData } from "../data/saveData";
// Functions
import { updateVariableChildren, findVariableIndex } from "../data/saveData";

export function validateVariables(
  parentVariable: string,
  expression: string
): boolean {
  const arrayedExpression: string[] = expression.split("");
  const variablesInExpression = Array.from(
    new Set(
      arrayedExpression.filter((token) => {
        return token.match(/^[a-z]$/i);
      })
    )
  );

  const currentChildren =
    saveData[0][findVariableIndex(parentVariable)].variableChildren;
  function cancelChildrenChange() {
    saveData[0][findVariableIndex(parentVariable)].variableChildren =
      currentChildren;
  }

  updateVariableChildren(parentVariable, expression);

  const HAS_ITSELF_IN_EXPRESSION =
    variablesInExpression.includes(parentVariable);

  if (HAS_ITSELF_IN_EXPRESSION) {
    console.log("Variable can't use itself in expression");
    cancelChildrenChange();
    return false;
  }

  const HAS_BANNED_VARIABLES = variablesInExpression.some((variable) => {
    return BANNED_VARIABLE_NAMES.includes(variable);
  });

  if (HAS_BANNED_VARIABLES) {
    console.log("Bad variable name");
    cancelChildrenChange();
    return false;
  }

  const currentSaveVariables = saveData[0].map((variableData) => {
    return variableData.variableName;
  });

  const HAS_UNKNOWN_VARIABLES = variablesInExpression.some((variable) => {
    return !currentSaveVariables.includes(variable);
  });

  if (HAS_UNKNOWN_VARIABLES) {
    console.log("Unknown variable name");
    cancelChildrenChange();
    return false;
  }

  function checkChildrenVariables(
    variableToCheck: string,
    childrenArray: string[]
  ): boolean {
    if (childrenArray.length === 0) {
      return true;
    } else {
      if (childrenArray.includes(variableToCheck)) return false;
      return childrenArray.reduce((acc: boolean, childVariable: string) => {
        return (
          acc &&
          checkChildrenVariables(
            variableToCheck,
            saveData[0][findVariableIndex(childVariable)].variableChildren
          )
        );
      }, true);
    }
  }

  const NO_VARIABLE_RECURSION = checkChildrenVariables(
    parentVariable,
    saveData[0][findVariableIndex(parentVariable)].variableChildren
  );

  if (!NO_VARIABLE_RECURSION) {
    console.log("Some variable in expression references current variable");
    cancelChildrenChange();
    return false;
  }

  return true;
}

export function validateExpression(expression: string): boolean {
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
            prevToken.tokenType !== ExpressionTokenType.RIGHT_PARENTHESIS &&
            prevToken.tokenType !== ExpressionTokenType.VARIABLE
          ) {
            throw new Error(
              "Binary operator must be after a number, variable or a right parenthesis"
            );
          }
          prevToken.tokenType = ExpressionTokenType.OPERATOR;
          prevToken.decimalPointUsed = false;
          break;
        case "(":
          if (
            prevToken.tokenType === ExpressionTokenType.NUMBER ||
            prevToken.tokenType === ExpressionTokenType.DECIMAL_POINT ||
            prevToken.tokenType === ExpressionTokenType.RIGHT_PARENTHESIS ||
            prevToken.tokenType === ExpressionTokenType.VARIABLE
          ) {
            throw new Error(
              "Left parenthesis can't be after a number, variable, decimal point of right parenthesis"
            );
          }
          openingParenthesis++;
          prevToken.tokenType = ExpressionTokenType.LEFT_PARENTHESIS;
          prevToken.decimalPointUsed = false;
          break;
        case ")":
          if (openingParenthesis <= 0) {
            throw new Error("Detected non matching parenthesis");
          } else if (
            prevToken.tokenType !== ExpressionTokenType.NUMBER &&
            prevToken.tokenType !== ExpressionTokenType.VARIABLE
          ) {
            throw new Error(
              "Right parenthesis must be after a number or a variable"
            );
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
          if (
            prevToken.tokenType === ExpressionTokenType.RIGHT_PARENTHESIS ||
            prevToken.tokenType === ExpressionTokenType.VARIABLE
          ) {
            throw new Error(
              "Number can't be after right parenthesis or variable"
            );
          }
          prevToken.tokenType = ExpressionTokenType.NUMBER;
          break;
        default:
          if (
            prevToken.tokenType === ExpressionTokenType.RIGHT_PARENTHESIS ||
            prevToken.tokenType === ExpressionTokenType.VARIABLE ||
            prevToken.tokenType === ExpressionTokenType.DECIMAL_POINT ||
            prevToken.tokenType === ExpressionTokenType.NUMBER
          ) {
            throw new Error(
              "Variable can't be after right parenthesis, variable, number or decimal point"
            );
          }
          prevToken.tokenType = ExpressionTokenType.VARIABLE;
          break;
      }
    });
    if (openingParenthesis !== 0) {
      throw new Error("Detected non matching parenthesis");
    }
    if (
      prevToken.tokenType !== ExpressionTokenType.RIGHT_PARENTHESIS &&
      prevToken.tokenType !== ExpressionTokenType.NUMBER &&
      prevToken.tokenType !== ExpressionTokenType.VARIABLE
    ) {
      throw new Error(
        "expression must end with a right parenthesis, variable or a number"
      );
    }
  } catch (errorMessage) {
    console.log(errorMessage);
    return false;
  }
  return true;
}

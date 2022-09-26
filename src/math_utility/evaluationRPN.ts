import { operators } from "../data/operators";
import { negativeExponent } from "./negativeExponent";

let precisionToLastSafe: { [key: number]: number } = {
  "1": 562949953421311,
  "2": 70368744177663,
  "3": 8796093022207,
  "4": 549755813887,
  "5": 68719476735,
  "6": 8589934591,
  "7": 536870911,
  "8": 67108863,
  "9": 8388607,
  "10": 524287,
  "11": 65535,
  "12": 8191,
  "13": 511,
  "14": 63,
  "15": 7,
};

function computePreciseFloat(floatNum: number) {
  const [integerPart, fractionalPart] = String(floatNum).split(".");
  const nonIntegerLength: number = fractionalPart.length;
  const positiveIntegerPart: number = Math.abs(Number(integerPart));
  if (
    nonIntegerLength > 15 ||
    precisionToLastSafe[nonIntegerLength] < positiveIntegerPart
  ) {
    let maximumPrecision = 15;
    while (maximumPrecision > 0) {
      if ((precisionToLastSafe[maximumPrecision] || 0) > positiveIntegerPart)
        break;
      maximumPrecision--;
    }
    const EPSILON = Number("1e-" + maximumPrecision);
    for (let precision = 0; precision < maximumPrecision; precision++) {
      const currentPrecisionFloat = Number(floatNum.toFixed(precision));
      if (Math.abs(floatNum - currentPrecisionFloat) < EPSILON) {
        return currentPrecisionFloat;
      }
    }
  }
  return floatNum;
}

function convertToRPN(stringToProcess: string) {
  let tokens = stringToProcess.split(
    /(?<=\d)(?=[^0-9.])|(?<=[^0-9.])(?=\d)|(?<=\D)(?=\D)/g
  );
  tokens = tokens.map((token: string, tokenIndex: number) => {
    if (
      token === "-" &&
      (tokenIndex === 0 ||
        (operators.hasOwnProperty(tokens[tokenIndex - 1]) &&
          operators[tokens[tokenIndex - 1]].mayBeFollowedByUnary))
    ) {
      return "-u";
    }
    return token;
  });

  let operatorsStack: string[] = [];
  let tokensInRPN: (string | number)[] = [];
  tokens.forEach((token) => {
    if (!operators.hasOwnProperty(token)) {
      //If token is a number
      tokensInRPN.push(+token);
    } else if (token === "(") {
      //If token is a left parenthesis
      operatorsStack.push(token);
    } else if (token === ")") {
      //If token is a right parenthesis
      while (operatorsStack[operatorsStack.length - 1] !== "(") {
        tokensInRPN.push(operatorsStack.pop()!);
      }
      operatorsStack.pop(); //Discard left parenthesis
    } else {
      //If token is an operator
      while (
        operatorsStack.length !== 0 &&
        operatorsStack[operatorsStack.length - 1] !== "(" &&
        ((operators[token].associativity === "left" &&
          operators[token].precedence! <=
            operators[operatorsStack[operatorsStack.length - 1]].precedence!) ||
          (operators[token].associativity === "right" &&
            operators[token].precedence! <
              operators[operatorsStack[operatorsStack.length - 1]].precedence!))
      ) {
        tokensInRPN.push(operatorsStack.pop()!);
      }
      operatorsStack.push(token);
    }
  });
  while (operatorsStack.length > 0) {
    tokensInRPN.push(operatorsStack.pop()!);
  }

  //Handle fractional exponents
  tokensInRPN = tokensInRPN.map((token, index) => {
    if (
      token === "/" &&
      index !== tokensInRPN.length - 1 &&
      tokensInRPN[index + 1] === "^"
    ) {
      return "/e";
    }
    return token;
  });

  return tokensInRPN;
}

export function calculateRPN(expression: string): [number, string] {
  let expressionArray: (string | number)[] = convertToRPN(expression);
  let calculationStack: (number | string)[] = [];
  try {
    expressionArray.forEach((token) => {
      if (typeof token === "number") {
        calculationStack.push(token);
      } else if (token === "-u") {
        let rhs = calculationStack.pop()!;
        // @ts-ignore rhs will always be a number
        calculationStack.push(rhs * -1);
      } else {
        let rhs = calculationStack.pop()!;
        let lhs = calculationStack.pop()!;
        let result;
        switch (token) {
          case "+":
            // @ts-ignore rhs, lhs will always be a number
            result = lhs + rhs;
            break;
          case "-":
            // @ts-ignore rhs, lhs will always be a number
            result = lhs - rhs;
            break;
          case "*":
            // @ts-ignore rhs, lhs will always be a number
            result = lhs * rhs;
            break;
          case "/":
            if (rhs === 0) throw new Error("Division by zero");
            // @ts-ignore rhs, lhs will always be a number
            result = lhs / rhs;
            break;
          case "/e":
            if (rhs === 0) throw new Error("Division by zero");
            // This will create a string from two numbers.
            // /e only exists after "^" operator hence the ts-ignore comments
            // See handling of fractional exponents in convertToRPN() for the insight
            result = `${lhs}/${rhs}`;
            break;
          case "^":
            let errorMessage;
            // @ts-ignore lhs will always be a number
            [result, errorMessage] = negativeExponent(lhs, rhs);
            if (Number.isNaN(result)) throw new Error(errorMessage);
            break;
        }
        if (typeof result === "number" && !Number.isInteger(result)) {
          result = computePreciseFloat(result);
        }
        calculationStack.push(result);
      }
    });
    // @ts-ignore if no error was thrown the last element will always be a number
    return [calculationStack[0], ""];
  } catch (error) {
    if (error instanceof Error) {
      return [NaN, error.message];
    }
    return [NaN, "Unknown error"];
  }
}

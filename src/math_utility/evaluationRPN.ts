import { operators } from "../data/operators";
import { negativeExponent } from "./negativeExponent";

export function convertToRPN(stringToProcess: string) {
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
        ((operators[token].associativity == "left" &&
          operators[token].precedence! <=
            operators[operatorsStack[operatorsStack.length - 1]].precedence!) ||
          (operators[token].associativity == "right" &&
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

export function calculateRPN(expressionArray: (string | number)[]) {
  let calculationStack: (number | string)[] = [];
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
      switch (token) {
        case "+":
          // @ts-ignore rhs, lhs will always be a number
          calculationStack.push(lhs + rhs);
          break;
        case "-":
          // @ts-ignore rhs, lhs will always be a number
          calculationStack.push(lhs - rhs);
          break;
        case "*":
          // @ts-ignore rhs, lhs will always be a number
          calculationStack.push(lhs * rhs);
          break;
        case "/":
          // @ts-ignore rhs, lhs will always be a number
          calculationStack.push(lhs / rhs);
          break;
        case "/e":
          // This will create a string from two numbers.
          // /e only exists after "^" operator hence the ts-ignore comments
          // See handling of fractional exponents in convertToRPN() for the insight
          calculationStack.push(`${lhs}/${rhs}`);
          break;
        case "^":
          // @ts-ignore lhs will always be a number
          calculationStack.push(negativeExponent(lhs, rhs));
          break;
      }
    }
  });
  return calculationStack[0];
}

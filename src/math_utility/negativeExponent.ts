interface Pow {
  exponent: number | null;
  sign: string;
}

export function negativeExponent(lhs: number, rhs: number | string) {
  if (lhs >= 0) {
    if (typeof rhs === "number") {
      return Math.pow(lhs, rhs);
    } //else if (typeof rhs === 'string')
    // @ts-ignore rhs will always have exactly one instance of "/"
    let [exponent, root]: [number | string, number | string] = rhs.split("/");
    exponent = +exponent;
    root = +root;
    return Math.pow(Math.pow(lhs, exponent), 1 / root);
  } //else if (lhs < 0)
  let pow: Pow = {
    exponent: null,
    sign: "impossible",
  };
  if (typeof rhs === "number") {
    pow = checkPossibilities(`${rhs}/1`);
  } else {
    //if (typeof rhs === 'string')
    pow = checkPossibilities(rhs);
  }

  rhs = pow.exponent!;
  if (pow.sign === "impossible") {
    !Number.isNaN(pow.exponent) && console.log("Cannot take an odd root from negative number");
    return NaN;
  } else if (pow.sign === "positive") {
    return Math.pow(-1 * lhs, rhs);
  } else {
    return -1 * Math.pow(-1 * lhs, rhs);
  }
}

function createPreciseEpsilon(precision: number) {
  let epsilonArray = ["0", "."];
  for (let counter = 0; counter < precision - 1; counter++) {
    epsilonArray.push("0");
  }
  epsilonArray.push("1");
  return +epsilonArray.join("");
}

function rationalizeFloat(targetFloat: number) {
  //Calculate optimal precision
  let precision = 15;
  let stringifiedFloat = targetFloat.toString();
  // @ts-ignore stringifiedFloat will always have exactly one instance of "."
  let integerPart: string = stringifiedFloat.split(".");
  precision -= integerPart === "0" ? 0 : integerPart.length;
  const RAT_FLOAT_EPSILON = createPreciseEpsilon(precision);

  //Navigate through Stern-Brocot tree
  function calculateBranchValue(L: number[], R: number[]) {
    return [L[0] + R[0], L[1] + R[1]];
  }

  let leftBranchValue: number[] = [0, 1];
  let rightBranchValue: number[] = [1, 0];
  let currentBranchValue: number[] = calculateBranchValue(
    leftBranchValue,
    rightBranchValue
  );
  let currentBranchFloatValue = currentBranchValue[0] / currentBranchValue[1];
  let killswitch = 1000000;
  try {
    while (
      Math.abs(currentBranchFloatValue - targetFloat) > RAT_FLOAT_EPSILON
    ) {
      if (killswitch-- === 0) {
        throw new Error("Too deep down the Stern-Brocot tree");
      }
      if (currentBranchFloatValue > targetFloat) {
        //Go down to the left branch
        rightBranchValue = currentBranchValue;
        currentBranchValue = calculateBranchValue(
          leftBranchValue,
          currentBranchValue
        );
        leftBranchValue = calculateBranchValue(
          currentBranchValue,
          rightBranchValue.map((x) => -1 * x)
        );
      } else {
        //if (currentBranchFloatValue < targetFloat)
        //Go down to the right branch
        leftBranchValue = currentBranchValue;
        currentBranchValue = calculateBranchValue(
          rightBranchValue,
          currentBranchValue
        );
        rightBranchValue = calculateBranchValue(
          currentBranchValue,
          leftBranchValue.map((x) => -1 * x)
        );
      }
      currentBranchFloatValue = currentBranchValue[0] / currentBranchValue[1];
    }
  } catch (error) {
    console.log("Rationalization impractical. " + error);
    currentBranchValue = [NaN, NaN];
  }
  return currentBranchValue;
}

function checkPossibilities(fractionalExponent: string) {
  // @ts-ignore fractionalExponent will always have exactly one instance of "/"
  let [exponent, root]: [number | string, number | string] =
    fractionalExponent.split("/");
  exponent = +exponent;
  root = +root;
  let result: Pow = {
    exponent: null,
    sign: "impossible",
  };

  function computeSignWhenBothIntegers(
    localExponent: number,
    localRoot: number
  ) {
    if (localExponent % 2 === 0) {
      //IF exponent is even integer AND root is even integer
      //OR exponent is even integer AND root is odd integer
      return "positive";
    } else if (Math.abs(localRoot) % 2 === 1) {
      //IF exponent is odd integer AND root is odd integer
      return "negative";
    } else {
      //IF exponent is odd integer AND root is even integer
      return "impossible";
    }
  }

  if (Number.isInteger(exponent) && Number.isInteger(root)) {
    result.sign = computeSignWhenBothIntegers(exponent, root);
  } else {
    let exponentDividedByRoot = exponent / root;
    if (Number.isInteger(exponentDividedByRoot)) {
      exponent = exponentDividedByRoot;
      root = 1;
      result.sign = computeSignWhenBothIntegers(exponent, root);
    } else {
      [exponent, root] = rationalizeFloat(exponentDividedByRoot);
      result.sign = computeSignWhenBothIntegers(exponent, root);
    }
  }
  result.exponent = exponent / root;
  return result;
}

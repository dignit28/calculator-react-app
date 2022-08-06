export interface CalculatorButton {
  id: string;
  text: string | (string | JSX.Element)[];
  value: string;
}

export interface OperatorRPN {
  precedence: number | null;
  associativity: string | null;
  mayBeFollowedByUnary: boolean;
}

export interface OperatorsRPN {
  [key: string]: OperatorRPN;
}

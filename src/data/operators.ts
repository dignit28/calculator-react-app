import { OperatorsRPN } from "../utility/interfaces";

export const operators: OperatorsRPN = {
  "-u": {
    precedence: 4,
    associativity: "right",
    mayBeFollowedByUnary: true,
  },
  "^": {
    precedence: 3,
    associativity: "right",
    mayBeFollowedByUnary: true,
  },
  "/": {
    precedence: 2,
    associativity: "left",
    mayBeFollowedByUnary: true,
  },
  "*": {
    precedence: 2,
    associativity: "left",
    mayBeFollowedByUnary: true,
  },
  "+": {
    precedence: 1,
    associativity: "left",
    mayBeFollowedByUnary: true,
  },
  "-": {
    precedence: 1,
    associativity: "left",
    mayBeFollowedByUnary: true,
  },
  "(": {
    precedence: null,
    associativity: null,
    mayBeFollowedByUnary: true,
  },
  ")": {
    precedence: null,
    associativity: null,
    mayBeFollowedByUnary: false,
  },
};
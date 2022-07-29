import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CalculatorButton } from "../utility/interfaces";

const buttons: CalculatorButton[] = [
  {
    id: uuidv4(),
    text: "1",
    value: "1",
  },
  {
    id: uuidv4(),
    text: "2",
    value: "2",
  },
  {
    id: uuidv4(),
    text: "3",
    value: "3",
  },
  {
    id: uuidv4(),
    text: "4",
    value: "4",
  },
  {
    id: uuidv4(),
    text: "5",
    value: "5",
  },
  {
    id: uuidv4(),
    text: "6",
    value: "6",
  },
  {
    id: uuidv4(),
    text: "7",
    value: "7",
  },
  {
    id: uuidv4(),
    text: "8",
    value: "8",
  },
  {
    id: uuidv4(),
    text: "9",
    value: "9",
  },
  {
    id: uuidv4(),
    text: "0",
    value: "0",
  },
  {
    id: uuidv4(),
    text: ["x", <sup key="button-exponent-text-id">y</sup>],
    value: "^",
  },
  {
    id: uuidv4(),
    text: "EVALUATE",
    value: "evaluate",
  },
];

export default buttons;

import { SaveDataState } from "../App";

export const saveDataInit: SaveDataState = [
  [
    {
      variableName: "x",
      variableComment: "Sample Save, this is its main variable.",
      variableChildren: ["y", "z"],
      inputData: {
        displayedValue: "24*(y*z)/5^-2/8/3",
        arrayValue: [
          "2",
          "4",
          "*",
          "(",
          "y",
          "*",
          "z",
          ")",
          "/",
          "5",
          "^",
          "-",
          "2",
          "/",
          "8",
          "/",
          "3",
          "caret",
        ],
      },
      computedData: {
        computedFormula: "24*(y*z)/5^-2/8/3",
        computedResult: "-57.43491774985174",
      },
    },
    {
      variableName: "y",
      variableComment: "Float exponent, negative base.",
      variableChildren: [],
      inputData: {
        displayedValue: "-8^0.2",
        arrayValue: ["-", "8", "^", "0", ".", "2", "caret"],
      },
      computedData: {
        computedFormula: "-8^0.2",
        computedResult: "-1.515716566510398",
      },
    },
    {
      variableName: "z",
      variableComment: "Fractional exponent, negative base.",
      variableChildren: [],
      inputData: {
        displayedValue: "-8^(2/10)",
        arrayValue: ["-", "8", "^", "(", "2", "/", "1", "0", ")", "caret"],
      },
      computedData: {
        computedFormula: "-8^(2/10)",
        computedResult: "1.515716566510398",
      },
    },
  ],
];

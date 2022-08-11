interface VariableData {
  variableName: string;
  variableComment: string;
  variableChildren: string[];
  inputData: {
    displayedValue: string;
    arrayValue: string[];
  };
  formulaData: {
    displayedFormula: string;
    result: string;
  };
}

type SaveData = [string, VariableData][][];

const saveData: SaveData = [
  [
    [
      "x",
      {
        variableName: "x",
        variableComment: "Variable x",
        variableChildren: [],
        inputData: {
          displayedValue: "",
          arrayValue: ["caret"],
        },
        formulaData: {
          displayedFormula: "",
          result: "",
        },
      },
    ],
    [
      "y",
      {
        variableName: "y",
        variableComment: "Variable y",
        variableChildren: [],
        inputData: {
          displayedValue: "",
          arrayValue: ["caret"],
        },
        formulaData: {
          displayedFormula: "",
          result: "",
        },
      },
    ],
  ],
];

export default saveData;

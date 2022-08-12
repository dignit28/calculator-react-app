import { FormulaState, ExpressionState } from "../App";

interface VariableData {
  variableName: string;
  variableComment: string;
  variableChildren: string[];
  inputData: ExpressionState;
  formulaData: FormulaState;
}

type SaveData = Record<string, VariableData>[];

export const saveData: SaveData = [
  {
    x: {
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
    y: {
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
  },
];

export const updateSaveData = (
  save: number,
  variable: string,
  newInputData: ExpressionState,
  newFormulaData: FormulaState
) => {
  const newArrayValue = newInputData.displayedValue.split("");
  newArrayValue.push("caret");

  saveData[save][variable].inputData = {
    displayedValue: newInputData.displayedValue,
    arrayValue: newArrayValue,
  };
  saveData[save][variable].formulaData = newFormulaData;
};

export const updateVariableChildren = (
  parentVariable: string,
  expression: string
) => {
  const arrayedExpression: string[] = expression.split("");
  const variablesInExpression = Array.from(
    new Set(
      arrayedExpression.filter((token) => {
        return token.match(/^[a-z]$/i);
      })
    )
  );

  console.log(variablesInExpression);

  saveData[0][parentVariable].variableChildren = variablesInExpression;
};

import { FormulaState, ExpressionState } from "../App";

export interface VariableData {
  variableName: string;
  variableComment: string;
  variableChildren: string[];
  inputData: ExpressionState;
  formulaData: FormulaState;
}

type SaveData = VariableData[][];

export const saveData: SaveData = [
  [
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
];

export const updateSaveData = (
  save: number,
  variable: string,
  newInputData: ExpressionState,
  newFormulaData: FormulaState
) => {
  const newArrayValue = newInputData.displayedValue.split("");
  newArrayValue.push("caret");

  saveData[save][findVariableIndex(variable)].inputData = {
    displayedValue: newInputData.displayedValue,
    arrayValue: newArrayValue,
  };
  saveData[save][findVariableIndex(variable)].formulaData = newFormulaData;
};

export const updateInputData = (
  save: number,
  variable: string,
  newInputData: ExpressionState
) => {
  const newArrayValue = newInputData.displayedValue.split("");
  newArrayValue.push("caret");

  saveData[save][findVariableIndex(variable)].inputData = {
    displayedValue: newInputData.displayedValue,
    arrayValue: newArrayValue,
  };
};

export const updateFormulaData = (
  save: number,
  variable: string,
  newFormulaData: FormulaState
) => {
  saveData[save][findVariableIndex(variable)].formulaData = newFormulaData;
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

  saveData[0][findVariableIndex(parentVariable)].variableChildren = variablesInExpression;
};

export const findVariableIndex = (variable: string) => {
  const variableIndex = saveData[0].findIndex((variableData: VariableData) => {
    return variableData.variableName === variable;
  });

  return variableIndex !== -1 ? variableIndex : 0;
};

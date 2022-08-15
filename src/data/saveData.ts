import { ComputedFormulaState, ExpressionState } from "../App";

export interface VariableData {
  variableName: string;
  variableComment: string;
  variableChildren: string[];
  inputData: ExpressionState;
  computedData: ComputedFormulaState;
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
      computedData: {
        computedFormula: "",
        computedResult: "",
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
      computedData: {
        computedFormula: "",
        computedResult: "",
      },
    },
  ],
];

export const updateSaveData = (
  save: number,
  variable: string,
  newInputData: ExpressionState,
  newComputedData: ComputedFormulaState
) => {
  const newArrayValue = newInputData.displayedValue.split("");
  newArrayValue.push("caret");

  saveData[save][findVariableIndex(variable)].inputData = {
    displayedValue: newInputData.displayedValue,
    arrayValue: newArrayValue,
  };
  saveData[save][findVariableIndex(variable)].computedData = newComputedData;
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
  newComputedData: ComputedFormulaState
) => {
  saveData[save][findVariableIndex(variable)].computedData = newComputedData;
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

  saveData[0][findVariableIndex(parentVariable)].variableChildren =
    variablesInExpression;
};

export const findVariableIndex = (variable: string) => {
  const variableIndex = saveData[0].findIndex((variableData: VariableData) => {
    return variableData.variableName === variable;
  });

  return variableIndex !== -1 ? variableIndex : 0;
};

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

  saveData[save][findVariableIndex(save, variable)].inputData = {
    displayedValue: newInputData.displayedValue,
    arrayValue: newArrayValue,
  };
  saveData[save][findVariableIndex(save, variable)].computedData = newComputedData;
};

export const updateInputData = (
  save: number,
  variable: string,
  newInputValue: string
) => {
  const newArrayValue = newInputValue.split("");
  newArrayValue.push("caret");

  saveData[save][findVariableIndex(save, variable)].inputData = {
    displayedValue: newInputValue,
    arrayValue: newArrayValue,
  };
};

export const updateFormulaData = (
  save: number,
  variable: string,
  newComputedData: ComputedFormulaState
) => {
  saveData[save][findVariableIndex(save, variable)].computedData = newComputedData;
};

export const updateVariableChildren = (
  save: number,
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

  saveData[save][findVariableIndex(save, parentVariable)].variableChildren =
    variablesInExpression;
};

export const findVariableIndex = (save: number, variable: string) => {
  const variableIndex = saveData[save].findIndex(
    (variableData: VariableData) => {
      return variableData.variableName === variable;
    }
  );

  return variableIndex !== -1 ? variableIndex : 0;
};

export const getParentVariables = (save: number, variable: string) => {
  // This function will create array of dependent variables in the order
  // that is needed for correct evaluation
  const currentSaveVariables = saveData[save].map((variableData) => {
    return variableData.variableName;
  });

  const parentsArrayWithDuplicates: string[] = [];

  const addParentsToArray = (childVariable: string) => {
    currentSaveVariables.forEach((parentVariable) => {
      if (
        saveData[save][
          findVariableIndex(save, parentVariable)
        ].variableChildren.includes(childVariable)
      ) {
        parentsArrayWithDuplicates.push(parentVariable);
        addParentsToArray(parentVariable);
      }
    });
  };

  addParentsToArray(variable);

  // Now create array without duplicates by popping the one with duplicates
  // That way least dependent, lower-order variables will be evaluated first
  // And higher-order variables will be evaluated last
  const parentsArray: string[] = [];

  while (parentsArrayWithDuplicates.length !== 0) {
    const poppedParent = parentsArrayWithDuplicates.pop();
    if (!parentsArray.includes(poppedParent!)) {
      parentsArray.unshift(poppedParent!);
    }
  }

  return parentsArray;
};

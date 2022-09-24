import React from "react";
import Calculator from "./components/Calculator/Calculator";
import Formulas from "./components/Formulas/Formulas";
import Saves from "./components/Saves/Saves";
import Variables from "./components/Variables/Variables";
import { MathJaxContext } from "better-react-mathjax";
import { GlobalStyle } from "./App.styles";
import { VariableData } from "./utility/interfaces";
import { saveDataInit } from "./data/saveDataInit";

//require(".././public/icons/favicon.ico");

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"],
    ],
  },
};

export type SaveDataState = VariableData[][];

export type CurrentSaveState = {
  index: number;
};

export type CurrentVariableState = {
  name: string;
  index: number;
};

export type ExpressionState = {
  displayedValue: string;
  arrayValue: string[];
};

export type ComputedFormulaState = {
  computedFormula: string;
  computedResult: string;
};

function App() {
  const [saveData, setSaveData] = React.useState<SaveDataState>(
    () =>
      JSON.parse(localStorage.getItem("calculatorSaveData")!) || saveDataInit
  );

  React.useEffect(() => {
    localStorage.setItem("calculatorSaveData", JSON.stringify(saveData));
  });

  const updateInputData = (
    save: number,
    variable: string,
    newInputValue: string
  ) => {
    const newArrayValue = newInputValue.split("");
    newArrayValue.push("caret");

    setSaveData((prevSaveData) => {
      const newSaveData: SaveDataState = [...prevSaveData];
      newSaveData[save][findVariableIndex(save, variable)].inputData = {
        displayedValue: newInputValue,
        arrayValue: newArrayValue,
      };
      return newSaveData;
    });
  };

  const findVariableIndex = (save: number, variable: string) => {
    const variableIndex = saveData[save].findIndex(
      (variableData: VariableData) => {
        return variableData.variableName === variable;
      }
    );

    return variableIndex !== -1 ? variableIndex : 0;
  };

  const updateFormulaData = (
    save: number,
    variable: string,
    newComputedData: ComputedFormulaState
  ) => {
    setSaveData((prevSaveData) => {
      const newSaveData: SaveDataState = [...prevSaveData];
      newSaveData[save][findVariableIndex(save, variable)].computedData =
        newComputedData;
      return newSaveData;
    });
  };

  const updateVariableChildren = (
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
    setSaveData((prevSaveData) => {
      const newSaveData: SaveDataState = [...prevSaveData];
      newSaveData[save][
        findVariableIndex(save, parentVariable)
      ].variableChildren = variablesInExpression;
      return newSaveData;
    });
  };

  const getParentVariables = (save: number, variable: string) => {
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

  const [currentSave, setCurrentSave] = React.useState<CurrentSaveState>({
    index: 0,
  });

  const [currentVariable, setCurrentVariable] =
    React.useState<CurrentVariableState>({
      name: saveData[0][0].variableName,
      index: 0,
    });

  const [computedFormula, setComputedFormula] =
    React.useState<ComputedFormulaState>(saveData[0][0].computedData);

  React.useEffect(() => {
    setComputedFormula(
      saveData[currentSave.index][currentVariable.index].computedData
    );
  }, [currentVariable, currentSave]);

  return (
    <>
      <GlobalStyle />
      <MathJaxContext config={config}>
        <div className="page">
          <Saves
            saveData={saveData}
            setSaveData={setSaveData}
            currentSave={currentSave}
            setCurrentSave={setCurrentSave}
            currentVariable={currentVariable}
            setCurrentVariable={setCurrentVariable}
            updateInputData={updateInputData}
          />
          <Variables
            saveData={saveData}
            setSaveData={setSaveData}
            currentVariable={currentVariable}
            currentSave={currentSave}
            setCurrentVariable={setCurrentVariable}
            updateInputData={updateInputData}
            findVariableIndex={findVariableIndex}
            getParentVariables={getParentVariables}
          />
          <main className="main-content">
            <Calculator
              saveData={saveData}
              setComputedFormula={setComputedFormula}
              currentSave={currentSave}
              currentVariable={currentVariable}
              updateInputData={updateInputData}
              findVariableIndex={findVariableIndex}
              updateFormulaData={updateFormulaData}
              updateVariableChildren={updateVariableChildren}
              getParentVariables={getParentVariables}
            />
            <Formulas
              saveData={saveData}
              computedFormula={computedFormula.computedFormula}
              computedResult={computedFormula.computedResult}
              currentSave={currentSave}
              currentVariable={currentVariable}
              findVariableIndex={findVariableIndex}
            />
          </main>
        </div>
      </MathJaxContext>
    </>
  );
}

export default App;

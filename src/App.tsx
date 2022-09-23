import React from "react";
import Calculator from "./components/Calculator/Calculator";
import Formulas from "./components/Formulas/Formulas";
import Saves from "./components/Saves/Saves";
import Variables from "./components/Variables/Variables";
import { MathJaxContext } from "better-react-mathjax";
import { saveData } from "./data/saveData";
import { GlobalStyle } from "./App.styles";

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
            currentSave={currentSave}
            setCurrentSave={setCurrentSave}
            currentVariable={currentVariable}
            setCurrentVariable={setCurrentVariable}
          />
          <Variables
            currentVariable={currentVariable}
            currentSave={currentSave}
            setCurrentVariable={setCurrentVariable}
          />
          <main className="main-content">
            <Calculator
              setComputedFormula={setComputedFormula}
              currentSave={currentSave}
              currentVariable={currentVariable}
            />
            <Formulas
              computedFormula={computedFormula.computedFormula}
              computedResult={computedFormula.computedResult}
              currentSave={currentSave}
              currentVariable={currentVariable}
            />
          </main>
        </div>
      </MathJaxContext>
    </>
  );
}

export default App;

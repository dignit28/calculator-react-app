import React from "react";
import Calculator from "./components/Calculator/Calculator";
import Formulas from "./components/Formulas/Formulas";
import Saves from "./components/Saves/Saves";
import Variables from "./components/Variables/Variables";
import { MathJaxContext } from "better-react-mathjax";
import { saveData } from "./data/saveData";
import { findVariableIndex } from "./data/saveData";

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
  const [currentVariable, setCurrentVariable] =
    React.useState<CurrentVariableState>({
      name: saveData[0][0].variableName,
      index: findVariableIndex(saveData[0][0].variableName),
    });

  const [computedFormula, setComputedFormula] =
    React.useState<ComputedFormulaState>(
      saveData[0][currentVariable.index].computedData
    );

  React.useEffect(() => {
    setComputedFormula(saveData[0][currentVariable.index].computedData);
  }, [currentVariable]);

  return (
    <MathJaxContext config={config}>
      <div className="page">
        {/* <Saves /> */}
        <Variables
          currentVariable={currentVariable}
          setCurrentVariable={setCurrentVariable}
        />
        <Calculator
          setComputedFormula={setComputedFormula}
          currentVariable={currentVariable}
        />
        <Formulas
          computedFormula={computedFormula.computedFormula}
          computedResult={computedFormula.computedResult}
          currentVariable={currentVariable}
        />
      </div>
    </MathJaxContext>
  );
}

export default App;

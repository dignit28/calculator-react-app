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
  const [currentSave, setCurrentSave] = React.useState<number>(0);

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
        <Saves currentSave={currentSave} setCurrentSave={setCurrentSave} />
        <Variables
          currentVariable={currentVariable}
          currentSave={currentSave}
          setCurrentVariable={setCurrentVariable}
        />
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
      </div>
    </MathJaxContext>
  );
}

export default App;

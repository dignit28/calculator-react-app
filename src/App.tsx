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

export type ExpressionState = {
  displayedValue: string;
  arrayValue: string[];
};

export type FormulaState = {
  displayedFormula: string;
  result: string;
};

function App() {
  const [currentVariable, setCurrentVariable] = React.useState<string>(
    saveData[0][0].variableName
  );

  const currentVariableIndex = findVariableIndex(currentVariable);

  const [expression, setExpression] = React.useState<ExpressionState>(
    saveData[0][currentVariableIndex].inputData
  );
  const [formula, setFormula] = React.useState<FormulaState>(
    saveData[0][currentVariableIndex].formulaData
  );

  React.useEffect(() => {
    setExpression(saveData[0][currentVariableIndex].inputData);
    setFormula(saveData[0][currentVariableIndex].formulaData);
  }, [currentVariable]);

  return (
    <MathJaxContext config={config}>
      <div className="page">
        {/* <Saves /> */}
        <Variables
          currentVariable={currentVariable}
          setCurrentVariable={setCurrentVariable}
          expression={expression}
          formula={formula}
        />
        <Calculator
          expression={expression}
          setExpression={setExpression}
          setFormula={setFormula}
          currentVariable={currentVariable}
        />
        <Formulas
          formula={formula.displayedFormula}
          result={formula.result}
          currentVariable={currentVariable}
        />
      </div>
    </MathJaxContext>
  );
}

export default App;

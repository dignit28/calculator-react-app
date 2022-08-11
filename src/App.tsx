import React from "react";
import Calculator from "./components/Calculator";
import Formulas from "./components/Formulas";
import Saves from "./components/Saves";
import Variables from "./components/Variables";
import { MathJaxContext } from "better-react-mathjax";
import saveData from "./data/saveData";

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
  const [expression, setExpression] = React.useState<ExpressionState>(saveData[0][1].inputData);
  const [formula, setFormula] = React.useState<FormulaState>(saveData[0][1].formulaData);
  
  return (
    <MathJaxContext config={config}>
      <div className="page">
        {/* <Saves /> */}
        <Variables />
        <Calculator
          expression={expression}
          setExpression={setExpression}
          setFormula={setFormula}
        />
        <Formulas formula={formula.displayedFormula} result={formula.result} />
      </div>
    </MathJaxContext>
  );
}

export default App;

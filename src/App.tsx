import React from "react";
import Calculator from "./components/Calculator";
import Formulas from "./components/Formulas";
import Saves from "./components/Saves";
import Variables from "./components/Variables";
import { MathJaxContext } from "better-react-mathjax";

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
  const [expression, setExpression] = React.useState<ExpressionState>({
    displayedValue: "",
    arrayValue: ["caret"],
  });
  const [formula, setFormula] = React.useState<FormulaState>({
    displayedFormula: "",
    result: "",
  });

  return (
    <MathJaxContext config={config}>
    <div className="page">
      {/* <Saves /> */}
      {/* <Variables /> */}
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

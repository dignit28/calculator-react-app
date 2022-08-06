import React from "react";
import Calculator from "./components/Calculator";
import Formulas from "./components/Formulas";
import Saves from "./components/Saves";
import Variables from "./components/Variables";

export type ExpressionState = {
  displayedValue: string;
  arrayValue: string[];
};

function App() {
  const [expression, setExpression] = React.useState<ExpressionState>({
    displayedValue: "",
    arrayValue: ["caret"],
  });

  return (
    <div className="page">
      {/* <Saves /> */}
      {/* <Variables /> */}
      <Calculator expression={expression} setExpression={setExpression} />
      <Formulas expression={expression} />
    </div>
  );
}

export default App;

import React from "react";
import { MathJax } from "better-react-mathjax";

type FormulasProps = {
  computedFormula: string;
  computedResult: string;
  currentVariable: string;
};
/////////////// FIX //////////////////
/*
"+-" Rendering
Infinity | -Infinity rendering
*/
///////////// FIX END ////////////////

const fixASCIIMathRendering = (expression: string) => {
  // This does nothing yet
  return expression;
};

const Formulas: React.FC<FormulasProps> = React.memo((props) =>
  props.computedResult === "Invalid input" ? (
    <span>Invalid input</span>
  ) : (
    <div>
      <MathJax inline dynamic>
        {`$
      ${props.computedFormula === "" ? "" : props.currentVariable + "="}
      ${fixASCIIMathRendering(props.computedFormula)}
      ${props.computedFormula === "" ? "" : "="}
      ${fixASCIIMathRendering(props.computedResult)}
      $`}
      </MathJax>
    </div>
  )
);

export default Formulas;

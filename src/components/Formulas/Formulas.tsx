import React from "react";
import { MathJax } from "better-react-mathjax";

type FormulasProps = {
  formula: string;
  result: string;
  currentVariable: string;
};
/////////////// FIX //////////////////
/*
"+-" Rendering
Infinity | -Infinity rendering
*/
///////////// FIX END ////////////////
const Formulas: React.FC<FormulasProps> = React.memo((props) =>
  props.result === "Invalid input" ? (
    <span>Invalid input</span>
  ) : (
    <div>
      <MathJax inline dynamic>
      {`$
      ${props.formula === "" ? "" : props.currentVariable + "="}
      ${props.formula}
      ${props.formula === "" ? "" : "="}
      ${props.result}
      $`}
      </MathJax>
    </div>
  )
);

export default Formulas;

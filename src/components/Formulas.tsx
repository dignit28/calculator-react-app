import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
// Types
import { ExpressionState } from "../App";

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"]
    ]
  }
};

type FormulasProps = {
  expression: ExpressionState;
};

const Formulas: React.FC<FormulasProps> = (props) => (
  <MathJaxContext config={config}>
    <MathJax inline dynamic>{`$${props.expression.displayedValue}$`}</MathJax>
  </MathJaxContext>
);

export default Formulas;

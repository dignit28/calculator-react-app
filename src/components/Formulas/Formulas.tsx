import React from "react";
import { MathJax } from "better-react-mathjax";
// Functions
import { findVariableIndex } from "../../data/saveData";
// Data
import { saveData } from "../../data/saveData";
// Styles
import ChildVariablesWrapper from "./Formulas.styles";

type FormulasProps = {
  computedFormula: string;
  computedResult: string;
  currentVariable: string;
  currentVariableIndex: number;
};

const fixASCIIMathRendering = (expression: string) => {
  // Fix "+-" rendering
  expression = expression.replaceAll(/\+-/g, "+\\-");
  // Fix "Infinity" rendering
  expression = expression.replaceAll(/Infinity/g, "oo");
  return expression;
};

const Formulas: React.FC<FormulasProps> = React.memo((props) => {
  const childVariableElements = saveData[0][
    props.currentVariableIndex
  ].variableChildren.map((childVariable) => {
    const variableComment =
      saveData[0][findVariableIndex(childVariable)].variableComment;
    return (
      <li>
        {childVariable} - {variableComment}
      </li>
    );
  });

  return props.computedResult === "Invalid input" ? (
    <span>Invalid input</span>
  ) : (
    <div>
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
      <ChildVariablesWrapper>{childVariableElements}</ChildVariablesWrapper>
    </div>
  );
});

export default Formulas;

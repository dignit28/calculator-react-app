import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
// Functions
import { findVariableIndex } from "../../data/saveData";
// Data
import { saveData } from "../../data/saveData";
// Styles
import ChildVariablesWrapper from "./Formulas.styles";
//Types
import { CurrentVariableState } from "../../App";

type FormulasProps = {
  computedFormula: string;
  computedResult: string;
  currentSave: number;
  currentVariable: CurrentVariableState;
};

const fixASCIIMathRendering = (expression: string) => {
  // Fix "+-" rendering
  expression = expression.replaceAll(/\+-/g, "+\\-");
  // Fix "Infinity" rendering
  expression = expression.replaceAll(/Infinity/g, "oo");
  return expression;
};

const Formulas: React.FC<FormulasProps> = (props) => {
  const childVariableElements = saveData[props.currentSave][
    props.currentVariable.index
  ].variableChildren.map((childVariable) => {
    const variableComment =
      saveData[props.currentSave][findVariableIndex(props.currentSave, childVariable)].variableComment;
    return (
      <li key={uuidv4()}>
        {childVariable} - {variableComment}
      </li>
    );
  });

  return props.computedResult === "Invalid input" ? (
    <p>Invalid input</p>
  ) : (
    <div>
      <div>
        <MathJax inline dynamic>
          {`$
      ${props.computedFormula === "" ? "" : props.currentVariable.name + "="}
      ${fixASCIIMathRendering(props.computedFormula)}
      ${props.computedFormula === "" ? "" : "="}
      ${fixASCIIMathRendering(props.computedResult)}
      $`}
        </MathJax>
      </div>
      <ChildVariablesWrapper>{childVariableElements}</ChildVariablesWrapper>
    </div>
  );
};

export default Formulas;

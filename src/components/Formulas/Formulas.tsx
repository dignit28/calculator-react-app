import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
// Functions
import { findVariableIndex } from "../../data/saveData";
// Data
import { saveData } from "../../data/saveData";
// Styles
import { ChildVariablesWrapper, FormulasWrapper } from "./Formulas.styles";
//Types
import { CurrentSaveState, CurrentVariableState } from "../../App";

type FormulasProps = {
  computedFormula: string;
  computedResult: string;
  currentSave: CurrentSaveState;
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
  const childVariableElements = saveData[props.currentSave.index][
    props.currentVariable.index
  ].variableChildren.map((childVariable) => {
    const variableComment =
      saveData[props.currentSave.index][
        findVariableIndex(props.currentSave.index, childVariable)
      ].variableComment;
    return (
      <li key={uuidv4()}>
        {childVariable} - {variableComment}
      </li>
    );
  });

  return (
    <div className="formulas-component">
      <FormulasWrapper>
        {props.computedResult === "Invalid input" ? (
          <p>Invalid input</p>
        ) : (
          <>
            <MathJax dynamic className="mathjax-formula">
              {`$
      ${props.computedFormula === "" ? "" : props.currentVariable.name + "="}
      ${fixASCIIMathRendering(props.computedFormula)}
      ${props.computedFormula === "" ? "" : "="}
      ${fixASCIIMathRendering(props.computedResult)}
      $`}
            </MathJax>
            {childVariableElements.length > 0 ? (
              <ChildVariablesWrapper>
                {childVariableElements}
              </ChildVariablesWrapper>
            ) : (
              ""
            )}
          </>
        )}
      </FormulasWrapper>
    </div>
  );
};

export default Formulas;

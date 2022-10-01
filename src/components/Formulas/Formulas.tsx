import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
// Styles
import { ChildVariablesWrapper, FormulasWrapper } from "./Formulas.styles";
//Types
import {
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";

type FormulasProps = {
  computedFormula: string;
  computedResult: string;
  currentSave: CurrentSaveState;
  currentVariable: CurrentVariableState;
  findVariableIndex: (save: number, variable: string) => number;
  saveData: SaveDataState;
};

const fixASCIIMathRendering = (expression: string) => {
  // Fix "+-" rendering
  expression = expression.replaceAll(/\+-/g, "+\\-");
  // Fix "Infinity" rendering
  expression = expression.replaceAll(/Infinity/g, "oo");
  return expression;
};

const Formulas: React.FC<FormulasProps> = (props) => {
  const childVariableElements = props.saveData[props.currentSave.index][
    props.currentVariable.index
  ].variableChildren.map((childVariable) => {
    const variableData =
      props.saveData[props.currentSave.index][
        props.findVariableIndex(props.currentSave.index, childVariable)
      ];
    const variableComment = variableData.variableComment;
    const variableValue = variableData.computedData.computedResult;
    return (
      <li key={uuidv4()}>
        <MathJax inline dynamic>
          <span>
            {`$${childVariable}
            ${"="}
            ${variableValue}$`}
          </span>
          {" - "}
          {variableComment || "Variable " + childVariable}
        </MathJax>
      </li>
    );
  });

  console.log(props.currentVariable.name);

  return (
    <div className="formulas-component">
      <FormulasWrapper>
        {props.computedResult === "Invalid input" ? (
          <p>Invalid input</p>
        ) : (
          <>
            <p>
              {props.saveData[props.currentSave.index][
                props.currentVariable.index
              ].variableComment || "Variable " + props.currentVariable.name}
            </p>
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

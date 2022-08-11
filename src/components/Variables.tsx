import React from "react";
import { saveData, updateSaveData } from "../data/saveData";
import { FormulaState, ExpressionState } from "../App";

type VariablesProps = {
  currentVariable: string;
  setCurrentVariable: React.Dispatch<React.SetStateAction<string>>;
  formula: FormulaState;
  expression: ExpressionState;
};

const Variables: React.FC<VariablesProps> = (props) => {
  const [variables, setVariables] = React.useState<string[]>(
    Object.keys(saveData[0])
  );

  const handleButtonClick = (variable: string) => {
    updateSaveData(0, props.currentVariable, props.expression, props.formula);
    props.setCurrentVariable(variable);
  };

  const variableElements = variables.map((variable) => {
    return (
      <button key={variable} onClick={() => handleButtonClick(variable)}>
        {variable}
      </button>
    );
  });

  return <div>{variableElements}</div>;
};

export default Variables;

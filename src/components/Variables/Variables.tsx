import React from "react";
import { saveData, updateSaveData } from "../../data/saveData";
import { FormulaState, ExpressionState } from "../../App";
import EditForm from "./EditForm";

type VariablesProps = {
  currentVariable: string;
  setCurrentVariable: React.Dispatch<React.SetStateAction<string>>;
  formula: FormulaState;
  expression: ExpressionState;
};

const Variables: React.FC<VariablesProps> = (props) => {
  const [editIsShown, setEditIsShown] = React.useState(false);
  const [cursorClickPosition, setCursorClickPosition] = React.useState<
    [number, number]
  >([0, 0]);

  const openEditForm = (event: React.MouseEvent) => {
    setEditIsShown(true);
    setCursorClickPosition([event.clientX, event.clientY]);
  };

  const closeEditForm = () => {
    setEditIsShown(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      closeEditForm();
    }
  };

  const onClickOutside = (event: React.SyntheticEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("focus-trap")) closeEditForm();
  };

  const [variables, setVariables] = React.useState<string[]>(
    Object.keys(saveData[0])
  );

  const updateVariables = () => {
    setVariables(Object.keys(saveData[0]));
  };

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

  return (
    <div onKeyDown={onKeyDown}>
      <div>
        {variableElements}
        <button onClick={openEditForm}>+</button>
      </div>
      {editIsShown && (
        <EditForm
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
          position={cursorClickPosition}
          updateVariables={updateVariables}
          closeEditForm={closeEditForm}
          setCurrentVariable={props.setCurrentVariable}
        />
      )}
    </div>
  );
};

export default Variables;

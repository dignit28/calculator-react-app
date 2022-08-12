import React from "react";
import { saveData, updateInputData } from "../../data/saveData";
import { FormulaState, ExpressionState } from "../../App";
import EditForm from "./EditForm";
// Interfaces
import { VariableData } from "../../data/saveData";

type VariablesProps = {
  currentVariable: string;
  setCurrentVariable: React.Dispatch<React.SetStateAction<string>>;
  formula: FormulaState;
  expression: ExpressionState;
};

const Variables: React.FC<VariablesProps> = (props) => {
  const [formType, setFormType] = React.useState("new");
  const [assignedFormVariable, setAssignedFormVariable] = React.useState("");
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

  const [variables, setVariables] = React.useState<VariableData[]>(saveData[0]);

  const updateVariables = () => {
    setVariables(saveData[0]);
  };

  const handleButtonClick = (variable: string) => {
    updateInputData(0, props.currentVariable, props.expression);
    props.setCurrentVariable(variable);
  };

  const newVariable = (event: React.MouseEvent) => {
    setFormType("new");
    openEditForm(event);
  };

  const editVariable = (event: React.MouseEvent, variable: string) => {
    event.stopPropagation();
    setFormType("edit");
    setAssignedFormVariable(variable);
    openEditForm(event);
  };

  const deleteVariable = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const variableElements = variables.map((variable) => {
    return (
      <button
        key={variable.variableName}
        onClick={() => handleButtonClick(variable.variableName)}
      >
        {variable.variableName}
        <button onClick={(event) => editVariable(event, variable.variableName)}>
          E
        </button>
        <button onClick={deleteVariable}>D</button>
      </button>
    );
  });

  return (
    <div onKeyDown={onKeyDown}>
      <div>
        {variableElements}
        <button onClick={(event) => newVariable(event)}>+</button>
      </div>
      {editIsShown && (
        <EditForm
          formType={formType}
          assignedVariable={assignedFormVariable}
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

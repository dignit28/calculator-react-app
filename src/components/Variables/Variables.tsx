import React from "react";
import {
  findVariableIndex,
  saveData,
  updateInputData,
} from "../../data/saveData";
import { ExpressionState } from "../../App";
import EditForm from "./EditForm";
import DeleteDialogue from "./DeleteDialogue";
// Interfaces
import { VariableData } from "../../data/saveData";
// Types
import { CurrentVariableState } from "../../App";

type VariablesProps = {
  currentVariable: CurrentVariableState;
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
  expression: ExpressionState;
};

const Variables: React.FC<VariablesProps> = (props) => {
  const [formType, setFormType] = React.useState("new");
  const [assignedFormVariable, setAssignedFormVariable] = React.useState("");
  const [editIsShown, setEditIsShown] = React.useState(false);
  const [cursorClickPosition, setCursorClickPosition] = React.useState<
    [number, number]
  >([0, 0]);
  const [variables, setVariables] = React.useState<VariableData[]>(saveData[0]);
  const [deleteDialogueIsShown, setDeleteDialogueIsShown] =
    React.useState(false);

  React.useEffect(() => {
    if (editIsShown === true || deleteDialogueIsShown === true) {
      const confirmButton: HTMLButtonElement =
        document.querySelector(".confirm-button")!;
      confirmButton.focus();
    }
  }, [editIsShown, deleteDialogueIsShown]);

  const openEditForm = (event: React.MouseEvent) => {
    setEditIsShown(true);
    setCursorClickPosition([event.clientX, event.clientY]);
  };

  const closeEditForm = () => {
    setEditIsShown(false);
  };

  const openDeleteVariableDialogue = (event: React.MouseEvent) => {
    setDeleteDialogueIsShown(true);
    setCursorClickPosition([event.clientX, event.clientY]);
  };

  const closeDeleteVariableDialogue = () => {
    setDeleteDialogueIsShown(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        console.log("Escape memes");
        closeEditForm();
        closeDeleteVariableDialogue();
        break;
      case "Enter":
        event.preventDefault();
        console.log("Enter memes");
        const confirmButton: HTMLButtonElement =
          document.querySelector(".confirm-button")!;
        confirmButton.click();
        break;
    }
  };

  const onClickOutside = (event: React.SyntheticEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("focus-trap")) {
      closeEditForm();
      closeDeleteVariableDialogue();
    }
  };

  const updateVariables = () => {
    setVariables(saveData[0]);
  };

  const handleButtonClick = (variable: string) => {
    updateInputData(0, props.currentVariable.name, props.expression);
    props.setCurrentVariable({
      name: variable,
      index: findVariableIndex(variable),
    });
    console.log(saveData[0][findVariableIndex(variable)].variableChildren);
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

  const deleteVariable = (event: React.MouseEvent, variable: string) => {
    event.stopPropagation();
    setAssignedFormVariable(variable);
    openDeleteVariableDialogue(event);
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
        <button
          onClick={(event) => deleteVariable(event, variable.variableName)}
        >
          D
        </button>
      </button>
    );
  });

  return (
    <div>
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
      {deleteDialogueIsShown && (
        <DeleteDialogue
          assignedVariable={assignedFormVariable}
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
          position={cursorClickPosition}
          updateVariables={updateVariables}
          closeDeleteVariableDialogue={closeDeleteVariableDialogue}
          currentVariable={props.currentVariable}
          setCurrentVariable={props.setCurrentVariable}
        />
      )}
    </div>
  );
};

export default Variables;

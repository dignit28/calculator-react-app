import React from "react";
import { v4 as uuidv4 } from "uuid";
import EditForm from "./EditDialogue";
import DeleteVariableDialogue from "./DeleteVariableDialogue";
// Interfaces
import { VariableData } from "../../utility/interfaces";
// Types
import {
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";
// Styles
import VariablesWrapper from "./Variables.styles";

type VariablesProps = {
  saveData: SaveDataState;
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataState>>;
  currentVariable: CurrentVariableState;
  currentSave: CurrentSaveState;
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
  updateInputData: (
    save: number,
    variable: string,
    newInputValue: string
  ) => void;
  findVariableIndex: (save: number, variable: string) => number;
  getParentVariables: (save: number, variable: string) => string[];
};

const Variables: React.FC<VariablesProps> = (props) => {
  const [formType, setFormType] = React.useState("new");
  const [assignedFormVariable, setAssignedFormVariable] = React.useState("");
  const [editIsShown, setEditIsShown] = React.useState(false);
  const [cursorClickPosition, setCursorClickPosition] = React.useState<
    [number, number]
  >([0, 0]);
  const [variables, setVariables] = React.useState<VariableData[]>(
    props.saveData[props.currentSave.index]
  );
  const [deleteDialogueIsShown, setDeleteDialogueIsShown] =
    React.useState(false);

  React.useEffect(() => {
    if (editIsShown === true || deleteDialogueIsShown === true) {
      const confirmButton: HTMLButtonElement =
        document.querySelector(".confirm-button")!;
      confirmButton.focus();
    }
  }, [editIsShown, deleteDialogueIsShown]);

  React.useEffect(() => {
    setVariables(props.saveData[props.currentSave.index]);
  }, [props.currentSave, props.saveData]);

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
      case "Esc":
      case "Escape":
        closeEditForm();
        closeDeleteVariableDialogue();
        break;
      case "Enter":
        event.preventDefault();
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
    setVariables(props.saveData[props.currentSave.index]);
  };

  const handleButtonClick = (variable: string) => {
    const calculatorInputElement: HTMLInputElement =
      document.querySelector(".calculator-input")!;
    const expression = calculatorInputElement.value;
    props.updateInputData(
      props.currentSave.index,
      props.currentVariable.name,
      expression
    );
    props.setCurrentVariable({
      name: variable,
      index: props.findVariableIndex(props.currentSave.index, variable),
    });
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

  const variableElements = variables.map((variable, index) => {
    return (
      <li
        key={uuidv4()}
        className={props.currentVariable.index === index ? "selected" : ""}
        onClick={() => handleButtonClick(variable.variableName)}
      >
        <p>{variable.variableName}</p>
        <i
          className="fa-solid fa-pen-to-square"
          onClick={(event) => editVariable(event, variable.variableName)}
        ></i>
        {variables.length !== 1 ? (
          <i
            className="fa-solid fa-trash"
            onClick={(event) => deleteVariable(event, variable.variableName)}
          ></i>
        ) : (
          ""
        )}
      </li>
    );
  });

  return (
    <div className="variables-component">
      <VariablesWrapper>
        <ul>
          {variableElements}
          <li onClick={(event) => newVariable(event)}>
            <i className="fa-solid fa-plus add-save-button"></i>
          </li>
        </ul>
      </VariablesWrapper>
      {editIsShown && (
        <EditForm
          saveData={props.saveData}
          setSaveData={props.setSaveData}
          formType={formType}
          assignedVariable={assignedFormVariable}
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
          position={cursorClickPosition}
          updateVariables={updateVariables}
          closeEditForm={closeEditForm}
          setCurrentVariable={props.setCurrentVariable}
          currentSave={props.currentSave}
          findVariableIndex={props.findVariableIndex}
        />
      )}
      {deleteDialogueIsShown && (
        <DeleteVariableDialogue
          saveData={props.saveData}
          setSaveData={props.setSaveData}
          assignedVariable={assignedFormVariable}
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
          position={cursorClickPosition}
          updateVariables={updateVariables}
          closeDeleteVariableDialogue={closeDeleteVariableDialogue}
          currentVariable={props.currentVariable}
          setCurrentVariable={props.setCurrentVariable}
          currentSave={props.currentSave}
          findVariableIndex={props.findVariableIndex}
          getParentVariables={props.getParentVariables}
        />
      )}
    </div>
  );
};

export default Variables;

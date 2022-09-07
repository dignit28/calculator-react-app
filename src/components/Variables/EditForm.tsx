import React from "react";
// Styles
import { EditFormWrapper, FocusTrap } from "./Variables.styles";
// Functions
import { findVariableIndex } from "../../data/saveData";
// Data
import { saveData } from "../../data/saveData";
import { BANNED_VARIABLE_NAMES } from "../../data/bannedVariableNames";
//Types
import { CurrentVariableState } from "../../App";

type EditFormProps = {
  formType: string;
  assignedVariable: string;
  onKeyDown: (e: any) => void;
  onClickOutside: (e: any) => void;
  position: [number, number];
  updateVariables: () => void;
  closeEditForm: () => void;
  setCurrentVariable: React.Dispatch<
    React.SetStateAction<CurrentVariableState>
  >;
  currentSave: number;
};

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formData, setFormData] = React.useState({
    variableName: props.formType === "new" ? "" : props.assignedVariable,
    variableComment:
      props.formType === "new"
        ? ""
        : saveData[props.currentSave][findVariableIndex(props.currentSave, props.assignedVariable)]
            .variableComment,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const closeFormCleanup = (variableName: string) => {
    props.updateVariables();
    props.setCurrentVariable({
      name: variableName,
      index: findVariableIndex(props.currentSave, variableName),
    });
    props.closeEditForm();
  };

  const createNewVariable = (event: React.FormEvent) => {
    event.preventDefault();
    // Check if variable name is correct and not banned for use
    if (
      formData.variableName.match(/^[a-z]$/i) &&
      !BANNED_VARIABLE_NAMES.includes(formData.variableName)
    ) {
      const existingVariables = saveData[props.currentSave].map((variableData) => {
        return variableData.variableName;
      });
      // Check if new variable name is not taken
      if (!existingVariables.includes(formData.variableName)) {
        saveData[props.currentSave].push({
          variableName: formData.variableName,
          variableComment: formData.variableComment,
          variableChildren: [],
          inputData: {
            displayedValue: "",
            arrayValue: ["caret"],
          },
          computedData: {
            computedFormula: "",
            computedResult: "",
          },
        });

        closeFormCleanup(formData.variableName);
      } else {
        console.log("Variable with the same name already exists");
      }
    } else {
      console.log("Bad variable name");
    }
  };

  const editVariable = (event: React.FormEvent) => {
    event.preventDefault();
    // Check if variable name is correct and not banned for use
    const newVariableName = formData.variableName;
    const newVariableComment = formData.variableComment;
    if (
      newVariableName.match(/^[a-z]$/i) &&
      !BANNED_VARIABLE_NAMES.includes(newVariableName)
    ) {
      const existingVariables = saveData[props.currentSave].map((variableData) => {
        return variableData.variableName;
      });
      // Check if variable name is not taken or not changed
      if (
        !existingVariables.includes(newVariableName) ||
        newVariableName === props.assignedVariable
      ) {
        // If variable name is correct, start editing process
        // Iterate over every variable to fix dependencies
        existingVariables.forEach((variable) => {
          const variableData = saveData[props.currentSave][findVariableIndex(props.currentSave, variable)];
          const childrenOfVariable = variableData.variableChildren;
          // If the changing variable is in child list of current variable,
          // Rewrite current variable's data with new variable name
          const childIndex = childrenOfVariable.indexOf(props.assignedVariable);
          if (childIndex !== -1) {
            // Rewrite children array
            variableData.variableChildren[childIndex] = newVariableName;
            // Rewrite input data
            // Assert that user didn't change the input after last evaluation
            if (
              variableData.inputData.displayedValue ===
              variableData.computedData.computedFormula
            ) {
              // Simply replace old variable with new in arrayValue
              const oldNameVariableIndex =
                variableData.inputData.arrayValue.indexOf(
                  props.assignedVariable
                );
              variableData.inputData.arrayValue[oldNameVariableIndex] =
                newVariableName;

              // After changing array value, use it to create new input value
              variableData.inputData.displayedValue =
                variableData.inputData.arrayValue
                  .filter((token) => {
                    if (token !== "caret") {
                      return true;
                    }
                    return false;
                  })
                  .join("");
            } // if user changed input, don't change it's values
            // Rewrite computed data
            const arrayedDisplayedFormula =
              variableData.computedData.computedFormula.split("");
            const oldNameVariableIndex = arrayedDisplayedFormula.indexOf(
              props.assignedVariable
            );
            arrayedDisplayedFormula[oldNameVariableIndex] = newVariableName;
            variableData.computedData.computedFormula =
              arrayedDisplayedFormula.join("");
          }
        });
        // After editing dependent variables, fix the variable itself
        saveData[props.currentSave][findVariableIndex(props.currentSave, props.assignedVariable)].variableComment =
          newVariableComment;
        saveData[props.currentSave][findVariableIndex(props.currentSave, props.assignedVariable)].variableName =
          newVariableName;

        closeFormCleanup(newVariableName);
      } else {
        console.log("Variable with the same name already exists");
      }
    } else {
      console.log("Bad variable name");
    }
  };

  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onClickOutside}
    >
      <EditFormWrapper
        className="edit-form"
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onSubmit={props.formType === "new" ? createNewVariable : editVariable}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <p>Variable Name</p>
        <input
          type="text"
          autoComplete="off"
          name="variableName"
          onChange={handleChange}
          value={formData.variableName}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        />
        <p>Variable Comment</p>
        <input
          type="text"
          autoComplete="off"
          name="variableComment"
          onChange={handleChange}
          value={formData.variableComment}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        />
        <button className="confirm-button">
          {props.formType === "new" ? "Create" : "Edit"}
        </button>
      </EditFormWrapper>
    </FocusTrap>
  );
};

export default EditForm;

import React from "react";
// Styles
import { ModalWrapper, FocusTrap } from "../../misc_styles/Modals.styles";
import { BANNED_VARIABLE_NAMES } from "../../data/bannedVariableNames";
//Types
import {
  CurrentSaveState,
  CurrentVariableState,
  SaveDataState,
} from "../../App";

type EditFormProps = {
  saveData: SaveDataState;
  setSaveData: React.Dispatch<React.SetStateAction<SaveDataState>>;
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
  currentSave: CurrentSaveState;
  findVariableIndex: (save: number, variable: string) => number;
};

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formData, setFormData] = React.useState({
    variableName: props.formType === "new" ? "" : props.assignedVariable,
    variableComment:
      props.formType === "new"
        ? ""
        : props.saveData[props.currentSave.index][
            props.findVariableIndex(
              props.currentSave.index,
              props.assignedVariable
            )
          ].variableComment,
  });

  const [variableNameError, setVariableNameError] = React.useState<String>("");

  React.useEffect(() => {
    setVariableNameError("");
  }, [formData.variableName]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    isVariableInput: boolean
  ) {
    let newValue: string = event.target.value;

    if (isVariableInput) {
      newValue = newValue.slice(0, 1);
      newValue = newValue.replace(/[^a-z]/i, "");
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: newValue,
      };
    });
  }

  const closeFormCleanup = (variableName: string) => {
    props.updateVariables();
    props.setCurrentVariable({
      name: variableName,
      index: props.findVariableIndex(props.currentSave.index, variableName),
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
      const existingVariables = props.saveData[props.currentSave.index].map(
        (variableData) => {
          return variableData.variableName;
        }
      );
      // Check if new variable name is not taken
      if (!existingVariables.includes(formData.variableName)) {
        props.setSaveData((prevSaveData) => {
          const newSaveData = [...prevSaveData];
          newSaveData[props.currentSave.index].push({
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
          return newSaveData;
        });

        closeFormCleanup(formData.variableName);
      }
    } else {
      setVariableNameError("Can't use this variable name");
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
      const existingVariables = props.saveData[props.currentSave.index].map(
        (variableData) => {
          return variableData.variableName;
        }
      );
      // Check if variable name is not taken or not changed
      if (
        !existingVariables.includes(newVariableName) ||
        newVariableName === props.assignedVariable
      ) {
        // If variable name is correct, start editing process
        // Iterate over every variable to fix dependencies
        existingVariables.forEach((variable) => {
          const variableData =
            props.saveData[props.currentSave.index][
              props.findVariableIndex(props.currentSave.index, variable)
            ];
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
        props.setSaveData((prevSaveData) => {
          const newSaveData = [...prevSaveData];
          newSaveData[props.currentSave.index][
            props.findVariableIndex(
              props.currentSave.index,
              props.assignedVariable
            )
          ].variableComment = newVariableComment;
          newSaveData[props.currentSave.index][
            props.findVariableIndex(
              props.currentSave.index,
              props.assignedVariable
            )
          ].variableName = newVariableName;
          return newSaveData;
        });

        closeFormCleanup(newVariableName);
      }
    } else {
      setVariableNameError("Can't use this variable name");
    }
  };

  return (
    <FocusTrap
      className="focus-trap"
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onClickOutside}
    >
      <ModalWrapper
        className="edit-form"
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <p>Variable Name</p>
        {variableNameError && (
          <p className="variable-name-error-text">! {variableNameError}</p>
        )}
        <input
          type="text"
          className={variableNameError !== "" ? "variable-input-error" : ""}
          autoComplete="off"
          name="variableName"
          onChange={(e) => handleChange(e, true)}
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
          onChange={(e) => handleChange(e, false)}
          value={formData.variableComment}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        />
        <button
          className="confirm-button"
          onClick={props.formType === "new" ? createNewVariable : editVariable}
        >
          {props.formType === "new" ? "Create" : "Edit"}
        </button>
      </ModalWrapper>
    </FocusTrap>
  );
};

export default EditForm;

import React from "react";
// Styles
import { EditFormWrapper, FocusTrap } from "./EditForm.styles";
// Data
import { saveData } from "../../data/saveData";

type EditFormProps = {
  onKeyDown: (e: any) => void;
  onClickOutside: (e: any) => void;
  position: [number, number];
  updateVariables: () => void;
  closeEditForm: () => void;
  setCurrentVariable: React.Dispatch<React.SetStateAction<string>>;
};

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formData, setFormData] = React.useState({
    variableName: "",
    variableComment: "",
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
    props.setCurrentVariable(variableName);
    props.closeEditForm();
  };

  const BANNED_VARIABLE_NAMES = ["e"];

  const createNewVariable = (event: React.FormEvent) => {
    event.preventDefault();
    // Check if variable name is correct and not banned for use
    if (
      formData.variableName.match(/^[a-z]$/i) &&
      !BANNED_VARIABLE_NAMES.includes(formData.variableName)
    ) {
      console.log("here");
      const existingVariables = Object.keys(saveData[0]);
      // Check if new variable name is already taken
      if (!existingVariables.includes(formData.variableName)) {
        saveData[0][formData.variableName] = {
          variableName: formData.variableName,
          variableComment: formData.variableComment,
          variableChildren: [],
          inputData: {
            displayedValue: "",
            arrayValue: ["caret"],
          },
          formulaData: {
            displayedFormula: "",
            result: "",
          },
        };

        closeFormCleanup(formData.variableName);
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
        cursorX={props.position[0]}
        cursorY={props.position[1]}
        onSubmit={createNewVariable}
      >
        <p>Variable Name</p>
        <input
          type="text"
          autoComplete="off"
          name="variableName"
          onChange={handleChange}
          value={formData.variableName}
        />
        <p>Variable Comment</p>
        <input
          type="text"
          autoComplete="off"
          name="variableComment"
          onChange={handleChange}
          value={formData.variableComment}
        />
        <button>Create</button>
      </EditFormWrapper>
    </FocusTrap>
  );
};

export default EditForm;

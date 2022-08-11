import React from "react";
import saveData from "../data/saveData";
import VariableData from "../data/saveData";

const Variables = () => {
  const [variables, setVariables] = React.useState<string[]>(
    saveData[0].map((varToData) => varToData[0])
  );
  return <div>Variables</div>;
};

export default Variables;

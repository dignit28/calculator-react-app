import React from "react";
import Calculator from "./components/Calculator";
import Formulas from "./components/Formulas";
import Saves from "./components/Saves";
import Variables from "./components/Variables";


function App() {
  return (
    <div className="page">
      {/* <Saves /> */}
      {/* <Variables /> */}
      <Calculator />
      {/* <Formulas /> */}
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "devextreme/dist/css/dx.light.css";
import StudentWithdrawal from "./components/StudentWithdrawal";
function App() {
  return (
    <div className="App">
      <StudentWithdrawal />
    </div>
  );
}

export default App;

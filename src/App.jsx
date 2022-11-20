import React from "react";
import './StyleApp.scss'
import Companies from "./component/Companies/Companies";
import Employees from "./component/Employees/Employees";

function App () {
  return (
    <div className="wrapper">
      <Companies/>
      <div className='image_container'><img src='/img/right.svg'/></div>
      <Employees/>
    </div>
  );
}

export default App;

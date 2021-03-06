// 29/7/20 23:20 PRO
// SUCCESS BAR STATE IS 2 SUBMITS BEHIND !!1

/* 
CAN WE NAME PROPS AND METHODS THE SAME IN SIBLING OR ACROSS COMPONENTS? 
*/

import React, { Component } from "react";
import Game from "./Game";
// import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
       <Game />
      </div>
    );
  }
}

export default App;

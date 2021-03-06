import React, { Component } from "react";
// import "./App.css";

class SuccessBar extends Component {
  
  render() {
    const barContStyle = {
      width: "400px",
      height: "20px",
      backgroundColor: "orange"
    }

    const barStyle = {
      width: `${this.props.success}%`,
      height: "20px",
      backgroundColor: "green"
    }

    return (
      <div className='SuccessBar'>
       <h2>Success bar: you've got {this.props.success} % right</h2>
       <div className="BarContainer" style={barContStyle}>
         <div className="Bar" style={barStyle}></div>
       </div>
      </div>
    );
  }
}

export default SuccessBar;

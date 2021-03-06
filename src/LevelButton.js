import React, { Component } from "react";
// import "./App.css";

class LevelButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // console.log(this.props.level);
    this.props.setLevel(this.props.level); // PASS DATA UP TO LevelButtonRow AND CALL SET
  }

  render() {
    return (
      <div className='LevelButton'>
        <button onClick={this.handleClick}> 
            {this.props.level}
        </button>
      </div>
    );
  }
}

export default LevelButton;

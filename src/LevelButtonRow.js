import React, { Component } from "react";
import LevelButton from "./LevelButton";
import "./LevelButtonRow";
// import NumInput from "./NumInput";
// import "./App.css";

class LevelButtonRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,  // LEVEL SELECTED?
      level: 1  // LEVEL OF DIFFICULTY
    }
    this.set = this.set.bind(this);
  }
    static defaultProps = {
    numLevelButtons: 10
  };

  set(currentLevel) { // PASSED DOWN TO CHILD LEVELBUTTON ELEMENT
    this.setState({ level: currentLevel, isSelected: true}); // SET OWN STATE !
    this.props.setLevel(currentLevel);  // PASS DATA UP TO Game AND AND CALL SET !!!
    /*
     this.props.setLevel(this.props OR state.level) THIS DOESN'T WORK BECAUSE THE STATE IN Game WILL BE ONE STEP BEHIND THIS COMPONENT !!!
     */
  }

  makeRow() { // CREATE A BUTTON FOR EACH LEVEL
    let buttonRow = [];
    for (let y = 1; y <= this.props.numLevelButtons; y++) {
        // let num = `${y}`;                            // IF WE NEED num AS A STRING
        // console.log(typeof num);
      let num = y;  // ASSIGN LOOP VARIABLE TO BUTTONS AS KEY AND LEVEL
      buttonRow.push(
        <LevelButton
          setLevel={this.set} // PASS set DOWN AS A PROP
          key={num}
          level={num}
            // square={this.state.logicBoard[num - 1]}      // ( INDEX IS NUM + 1 )
        />
      )
    }
    return buttonRow;
  }

  render() {
    let levelMessage;
    this.state.isSelected ?
    levelMessage = `you are on level ${this.state.level}` : levelMessage = "choose difficulty"
    return (
      <div>
        <div className='LevelButtonRow animate fadeIn'>
          {this.makeRow()}
          <h2>{levelMessage}</h2>
        </div>
      </div>
    );
  }
}

export default LevelButtonRow;

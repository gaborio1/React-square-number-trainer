import React, { Component } from "react";
import LevelButtonRow from "./LevelButtonRow";
import NumInput from "./NumInput";
import Board from "./Board";
import SuccessBar from "./SuccessBar";
import "./Game.css";


// import "./App.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      gameStart: true,    // 1. WHEN PAGE LOADS
      gameSelect: false,  // 2. LEVEL SELECT MODE
      gamePlay: false,    // 3. PLAY MODE
      gameBoard: false,   // 4. BOARD MODE
      wrongNum: 0,        // FROM numInput VIA getWrongNum METHOD
      wrongNums: [],
      success: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.set = this.set.bind(this);
    this.getWrongNums = this.getWrongNums.bind(this);
    this.getSuccess = this.getSuccess.bind(this);
  }

  handleClick() {
    this.setState({ gameStart: false, gameSelect: true });
  }

  set(currentLevel) { // PASSED DOWN AS PROP TO levelButtonRow
    this.setState({ level: currentLevel, gamePlay: true, gameSelect: false }); // currentLevel IS COMING FROM LevelButtonRow
  }

  getWrongNums(wrongnum) {  // PASSED DOWN AS PROP TO numInput, wrongnum IS COMING FROM numInput
    this.setState({         // SYNC THIS STATE WITH numInput's STATE
      wrongNum: wrongnum,
      wrongNums: [...this.state.wrongNums, wrongnum]
    });
    // console.log(this.state.wrongNums);
  }

  getSuccess(success) {
    this.setState({ success: success});
  }

  render() {
    // CONDITIONALLY DISPLAY CONTENT IN return CALL
    let content;
    if (this.state.gameStart) content = <button className="start-button animate fadeIn" onClick={this.handleClick}>start</button>; 
    if (this.state.gameSelect) content =
      <div>
        <LevelButtonRow
          setLevel={this.set}
          />
        
      </div>
    if (this.state.gamePlay) content = 
      <div>
        {/* PASS set DOWN AS A PROP */}
        <LevelButtonRow setLevel={this.set}/> 
        <NumInput
          /* USE DATA FROM LevelButtonRow (SIBLLING) BY PASSING IT DOWN TO NumInput (SIBLING) */
          level={this.state.level}
          /* GET WRONG NUMBERS FROM NumInput */
          getWrongNums={this.getWrongNums}
          getSuccess={this.getSuccess}
          />
        <SuccessBar
        success={this.state.success}
        />
        <Board
         /* PASS DOWN wrongNum TO board AND THEN TO Cell */
         wrongnum={this.state.wrongNum}
        />
      </div>
    if (this.state.gameBoard) content = <Board />           // NOT USED YET
    return (
      <div className='App '>
        {content}
      </div>
    );
  }
}

export default Game;

import React, { Component } from "react";
// import LevelButtonRow from "./LevelButtonRow";
// import "./App.css";

class NumInput extends Component {
constructor(props) {
  super(props);
  this.state = {
    // level: 0,
    baseNum: 0,
    squareNum: 0,
    answer: undefined,
    // answerCorrect: "none",  // BOLLEAN DEFAULTS TO false !!!
    isAnswerCorrect: false,
    isPlayActive: false, // HAS PLAY BUTTON BEEN CLICKED?
    lastNums: [],
    correctNums: [],
    wrongNums: [],
    correctCount: 0,
    wrongCount: 0,
    success: 0  // COMING FROM calcSuccess
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  // this.random = this.random.bind(this);
  // this.calcSuccess = this.calcSuccess.bind(this);
}



lastNumsFilter = [];

random() {  // RANDOM NUM 1-10 - CALL IN handleClick
  let randomNum;
  randomNum = Math.floor(Math.random() * 10) + 1;  // GENERATE RANDOM NUMBER
  while (this.lastNumsFilter.indexOf(randomNum) > -1) { // WHILE IT'S IN THE LAST 4
    randomNum = Math.floor(Math.random() * 10) + 1;  // GENERATE A NEW ONE SO IT DOES NOT GET REPEATED FOR 4 TURNS AT LEAST
    console.log("repeated number");
  }
  this.lastNumsFilter.unshift(randomNum);
  this.lastNumsFilter.length >= 5 && this.lastNumsFilter.pop(); // BOOLEAN SHORTCUT, IF ARRAY LONGER THAN 4 REMOVE 1 ELEMENT
  console.log("last num filter: ",this.lastNumsFilter);
  return randomNum;
}

//===========================================================================================
calcSuccess() { // CALCULATE SUCCESS PERCENTAGE - CALL IN handleSubmit
  console.log(this.state.correctNums.length + " - " + this.state.wrongNums.length);

  let success = ((this.state.correctNums.length / (this.state.correctNums.length + this.state.wrongNums.length)) * 100).toFixed(2); // TRY toPrecision TO ROUND

  // CALL THIS METHOD IN HANDLESUBMIT AND UPDATE STATE HERE ??? 
  this.setState({
    success: success
  })

  console.log(`successPc: ${success} %`);
  // this.setState({ success: success}); // UPDATE STATE SUCCESS


  return success;
}
//===========================================================================================


handleChange(evt) {
  this.setState({
    [evt.target.name]: Number(evt.target.value) // UPDATE STATE OF INPUT FIELD
  });
}

handleClick(evt) {  // PLAY BUTTON ONCLICK
  evt.preventDefault(); // PREVENT RELOAD
  // console.log(`main level: ${this.props.level}`); // HAVE ACCESS TO LEVEL FROM LevelButtonRow THROUGH Game NOW !!!
  let baseNum = this.random() + (this.props.level - 1) * 10; // RANDOM NUM BASED OFF OF SELECTED DIFFICULTY LEVEL
  // console.log(baseNum);
  this.setState({
    baseNum: baseNum,                   // UPDETE BASENUM - STATE KEY : VARIABLE  CAN BE SAME!!!
    squareNum: Math.pow(baseNum, 2),    // CALCULATE AND UPDATE SQUARENUM 
    isPlayActive: true,                 // PLAY BUTTON HAS BEEN CLICKED
    isAnswerCorrect: false,
    lastNums: [...this.state.lastNums, baseNum] // STORE NUMBERS IN STATE AS THEY COME UP
  });
  // console.log(this.state.baseNum);
  console.log("last numbers: ", this.state.lastNums);
}

handleSubmit(evt) { // CALCSUCCESS IS ONE SUBMIT BEHIND !!!
  evt.preventDefault();
  // this.calcSuccess();
  // console.log(this.state.baseNum, typeof this.state.baseNum); // number
  // console.log(this.state.answer, typeof this.state.answer); // string


  this.setState({ isPlayActive: false }); // HIDE "now think"
  if (this.state.answer === this.state.squareNum) {     // CHECK IF ANSWER IS RIGHT
    this.setState({
      isAnswerCorrect: true,
      correctNums: [...this.state.correctNums,this.state.baseNum],
      correctCount: this.state.correctCount+1,
      answer: "",
      // success: this.calcSuccess()
    }); // SET STATE AND RESET ANSWER IN INPUT FIELD

    // this.calcSuccess();

  } else {  // IF WRONG ANSWER
      this.setState({
        isAnswerCorrect: false, // SET STATE AND RESET ANSWER IN INPUT FIELD
        answer: "",
        wrongNums: [...this.state.wrongNums, this.state.baseNum], // ADD NUMBER TO wrongNums
        wrongCount: this.state.wrongCount+1,
        // success: this.calcSuccess()
      }); 
      this.props.getWrongNums(this.state.baseNum);      // PASS UP WRONG NUMBER TO Game

      // this.calcSuccess();
  }
  // this.props.getSuccess(this.state.success);                    // TRY calcSuccess AS ARGUMENT !!! DO WE NEED STATE AT ALL?!
  this.props.getSuccess(this.calcSuccess());                    // TRY calcSuccess AS ARGUMENT !!! IT WORKS !!!
  // this.calcSuccess();
}

  render() {
    // CONDITIONALLY DISPLAY instruction, message AND placeholder
    let instruction;
    if (!this.state.isAnswerCorrect && this.state.baseNum > 0) 
      instruction = <p>what is {this.state.baseNum}<sup>2</sup> ?</p>   
    if (!this.state.isPlayActive && this.state.isAnswerCorrect)
      instruction = "click play";

    let message;  // BOOLEAN DEFAULTS TO false !!!
      if (!this.state.isAnswerCorrect && !this.state.isPlayActive && this.state.baseNum > 0)
      message = "you're wrong punk";
      // if (!this.state.isAnswerCorrect && !this.state.isPlayActive) message = "";
      if (this.state.isAnswerCorrect) message = "that's right madafaka";
      if (this.state.isPlayActive) message = "now think";

    let placeHolder; 
    if (this.state.isAnswerCorrect)
    placeHolder = this.state.squareNum; // ANSWER CORRECT?  KEEP CORRECT ANSWER 
    if (!this.state.isAnswerCorrect && !this.state.isPlayActive && this.state.baseNum > 0)
    placeHolder = "try again";  // WRONG ANSWER?
    if (!this.state.isAnswerCorrect && this.state.baseNum > 0 && this.state.isPlayActive) 
    placeHolder = "your guess"; // NEW NUMBER? 


    return (
      <div className='NumInput'>
        {/* ORIGINAL INSTRUCTION TO TEST */}
        {/* <p>what is num {this.state.baseNum} squared?</p> */}
        <h2>{instruction}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="answer"
            placeholder={placeHolder}
            value={this.state.answer}
            onChange={this.handleChange}
          />
        </form>
        <h2>{message}</h2>
        <button onClick={this.handleClick}>play</button>
      </div>
    );
  }
}

export default NumInput;

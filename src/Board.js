import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
    static defaultProps = {
        maxNum: 100                 // TABLE SIZE
    };

    constructor(props) {
        super(props);
        this.state = {
            logicBoard: this.createLogicBoard()    
        };
    }

    createLogicBoard() {                // CREATE BOARD WITH SQUARE MUMBERS
        let logicBoard = [];
        for (let y = 1; y <= this.props.maxNum; y++) {
            logicBoard.push(Math.pow(y, 2));
        }
        // console.log(logicBoard);
        return logicBoard;
        }

    // showSquare(num) {
        // console.log(typeof num);
        // let baseNum = Number(num);
        // console.log(baseNum);
        // console.log(typeof baseNum);
        // let squareNum = Math.pow(baseNum, 2);
        // console.log(squareNum);

    //     console.log(this.state.logicBoard[num - 1]);
    //     return (this.state.logicBoard[num - 1]);
    // }

    makeTable() {
        let sqBoard = [];
        for (let y = 1; y <= this.props.maxNum; y++) {
            // let num = `${y}`;                            // IF WE NEED num AS A STRING
            // console.log(typeof num);
            let num = y;
            sqBoard.push(
            <Cell
                key={num}
                base={num}
                square={this.state.logicBoard[num - 1]}      // ( INDEX IS NUM + 1 )
                wrongnum={this.props.wrongnum}  // FROM Game TO Cell (CHANGE COLOR OF CELL IF WRONG)
                // className="wrong"
            />)
        }
        return sqBoard;
    }
    render() {
        return (
            <div className='Board'>
                {this.makeTable()}
            </div>
        );
    }
}

export default Board;

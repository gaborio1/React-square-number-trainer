import React, {Component} from 'react'
import "./Cell.css"

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
            // isWrong: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        this.setState(
            !this.state.clicked ?           // TOGGLE clicled IN STATE
            { clicked: true}
            :
            { clicked: false}
        );
    }

    render() {
        let classes = "Cell" + (this.state.clicked ? " Cell-clicked" : "");   // DYNAMIC CLASSNAME BASED ON clicked
        if (this.props.base === this.props.wrongnum) classes = "Cell Wrong";  // IF CELL NO. === WRONG NUMBER 
        // if (this.state.clicked) classes = "Cell Cell-clicked"
        let display = this.state.clicked ?                                          // DYNAMIC CONTENT 
        this.props.square : this.props.base;                                       // SOLUTION || BASE NUM

        return (
            // DYNAMIC CLASSNAME
            <button className={classes} onClick={this.handleClick}>   
                {/* DYNAMIC CONTENT  */}
                {display}
                {/* {this.props.value} */}
                {/* {this.props.square} */}
            </button>
        );
    }
}


export default Cell
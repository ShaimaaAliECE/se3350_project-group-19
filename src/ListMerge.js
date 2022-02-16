import React, { Component } from "react";
import ReactDOM from 'react-dom';
import corAud from './/correct.mp3';
import incorAud from './/incorrect.mp3';

class ListMerge extends Component {
    constructor(){
      super();

      this.state = {
        bgColor: 'green'
      }
    }
    handleClick(value) {
      console.log(this.props.maxCount);
      console.log(this.props.steps[this.props.maxCount-2].stepType);
      console.log(value);
      console.log(this.props.steps[this.props.maxCount-2].clickValue);
      console.log(this.props.levelOfRecursion);
      console.log(this.props.steps[this.props.maxCount-2].levelOfRecursion);
  
      const correct = () => {
        new Audio(corAud).play();
        this.setState({
          bgColor: 'black'
        })
      }

      const incorrect = () => {
        new Audio(incorAud).play();
        this.setState({
          bgColor: 'red'
        })
      }
  
      if(this.props.steps[this.props.maxCount-2].stepType == "merge" && value == this.props.steps[this.props.maxCount-2].clickValue && this.props.levelOfRecursion == this.props.steps[this.props.maxCount-2].levelOfRecursion){
        console.log("correct merge click");
        correct();
        this.props.incrementMaxCount();
      }
      else {
        console.log("wrong merge click");
        incorrect();
      } 
        
      
  
    }
  
    render() {
      const { values } = this.props;
      
  
      return (
        <div className="list">
          {values.map(value => (
            <code className="cell" key={value} onClick = {() => {this.handleClick(value)}} style={{ color: this.state.bgColor}}>
              {value}
            </code>
          ))}
        </div>
      );
    }
  }

  export default ListMerge;
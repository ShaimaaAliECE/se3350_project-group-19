import React, { Component } from "react";
import ReactDOM from 'react-dom';
import corAud from './/correct.mp3';
import incorAud from './/incorrect.mp3';


class ListSplit extends Component {
  constructor(){
    super();

    this.state = {
       bgColor: 'green'
    }
  }
  
    handleClick(value) {
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



      if(this.props.steps[this.props.maxCount-2].stepType != "merge" && value == this.props.steps[this.props.maxCount-2].clickValue && this.props.levelOfRecursion == this.props.steps[this.props.maxCount-2].levelOfRecursion){
        console.log("correct click");
        correct();
        console.log("maxCount: "+this.props.maxCount);
        this.props.incrementMaxCount();
        
        
      }
      else  {
        console.log("maxCount: "+this.props.maxCount);
        console.log("wrong split click");
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

  export default ListSplit;
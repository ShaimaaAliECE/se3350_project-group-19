import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ListMerge extends Component {
  
    handleClick(value) {
      console.log(this.props.maxCount);
      console.log(this.props.steps[this.props.maxCount-2].stepType);
      console.log(value);
      console.log(this.props.steps[this.props.maxCount-2].clickValue);
      console.log(this.props.levelOfRecursion);
      console.log(this.props.steps[this.props.maxCount-2].levelOfRecursion);
  
  
  
      if(this.props.steps[this.props.maxCount-2].stepType == "merge" && value == this.props.steps[this.props.maxCount-2].clickValue && this.props.levelOfRecursion == this.props.steps[this.props.maxCount-2].levelOfRecursion){
        console.log("correct click");
        this.props.incrementMaxCount();
      }
      else  
        console.log("worng merge click");
      
  
    }
  
    render() {
      const { values } = this.props;
      
  
      return (
        <div className="list">
          {values.map(value => (
            <code className="cell" key={value} onClick = {() => {this.handleClick(value)}}>
              {value}
            </code>
          ))}
        </div>
      );
    }
  }

  export default ListMerge;
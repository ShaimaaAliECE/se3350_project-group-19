import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ListSplit extends Component {

  
    handleClick(value) {
  
      if(this.props.steps[this.props.maxCount-2].stepType != "merge" && value == this.props.steps[this.props.maxCount-2].clickValue && this.props.levelOfRecursion == this.props.steps[this.props.maxCount-2].levelOfRecursion){
        console.log("correct click");
        console.log("maxCount: "+this.props.maxCount);
        this.props.incrementMaxCount();
      }
      else  {
        console.log("maxCount: "+this.props.maxCount);
        console.log("worng split click");
      }
      
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

  export default ListSplit;
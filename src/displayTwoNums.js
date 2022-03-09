import React, { Component } from "react";
import ReactDOM from 'react-dom';

class DisplayTwoNums extends Component {
    render() {
      return (
        <div className="compareText">
            {this.props.compare}
        </div>
      );
    }
  }   

  export default DisplayTwoNums;
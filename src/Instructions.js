import React, { Component } from "react";
import ReactDOM from 'react-dom';

class Instructions extends Component {
    render() {
      return (
        <div className="instructions">
          <h3>
            {this.props.instruct}
          </h3>
        </div>
      );
    }
  }

  export default Instructions;
import React, { Component } from "react";
import PropTypes from "prop-types";
//Global variable to control flow
var i =0;

class List extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired
  };

  render() {
    const { values } = this.props;

    return (
      <div className="list">
        {values.map(value => (
          <code className="cell" key={value}>
            {value}
          </code>
        ))}
      </div>
    );
  }
}

class Join extends Component {
  static propTypes = {
    array: PropTypes.array.isRequired,
    left: PropTypes.number.isRequired,
    mid: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  };

  render() {
    const { array, left, right, mid, maxCount} = this.props;

    const leftSorted = array.slice(left, mid);
    const rightSorted = array.slice(mid, right);
    ++i;

    // here we mutate the array prop, so each component has access to the partial sorts
    // it's just a component communication, in real mergesort procedure, we wouldn't need this
    let sorted = [];

    while (leftSorted.length && rightSorted.length) {
      const [a] = leftSorted;
      const [b] = rightSorted;

      sorted.push(Math.min(a, b));

      sorted[sorted.length - 1] === a
        ? leftSorted.shift()
        : rightSorted.shift();
    }

    sorted = [...sorted, ...leftSorted, ...rightSorted];
    sorted.forEach((x, i) => (array[left + i] = x));
    return (
      <div>
      {i<maxCount && (<List values={sorted} />)}
      </div>
    );
  }
}

class MergeSort extends Component {


  static propTypes = {
    array: PropTypes.array.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  };


  recurse () {

    let { array, left, right, maxCount} = this.props;
    const chunk = array.slice(left, right);
    const mid = left + Math.floor(chunk.length / 2);

    

 
    return(
      <div>
         
        {chunk.length !=1 && (
         
          <>
            <MergeSort {...this.props} right={mid} currCount = {0} />
            <MergeSort {...this.props} left={mid} currCount = {0}   />
            <div className="join">
              <Join {...this.props} mid={mid} currCount = {0} />
            </div>
           
          </>
        )}
      </div>
    );
  }




  nextStep () {
    const { array, left, right, maxCount } = this.props;
    const chunk = array.slice(left, right);
    ++i;
    return (      
      <div className="input">

        {i<maxCount && (<List values={chunk}/>)}
      </div> 
  );
  }

  render() {

    return (
        <div className="merge-sort">
          {this.nextStep()}
          {this.recurse()}
        </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      proceed: true,
      maxCount: 2,
    };
  }

  handleClick (){
    i=0;
    let newcount = this.state.maxCount +2;
    this.setState({
      maxCount: newcount
    });
  }
  render() {
    const array = [8, 5, 4, 6, 7, 1, 3, 2,9];

    return (
      <>
        <header>
          <h1>Merge Sort Game</h1>
          <button onClick = {() => this.handleClick()}>
            {"next step"}
          </button>
        </header>
        <section>


          <MergeSort array={array} left={0} right={array.length} maxCount = {this.state.maxCount} />
        </section>
      </>
    );
  }
}

export default App;
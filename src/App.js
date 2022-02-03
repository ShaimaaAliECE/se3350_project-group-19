import React, { Component } from "react";
import PropTypes from "prop-types";
import generateMergeSteps from "./sort";
import generateRandomArray from "./rand_array";

//Global variable to control flow
var stepCounter =0;
var loopCounterIdx =0;
var stepCounterCalled = false;
var stepCounterCalledLoop = false;
var arrayGlobal = generateRandomArray(10, 20);




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

  increaseStepCounterLoop(length, i){
    if (i == length){
        stepCounterCalledLoop = !stepCounterCalledLoop;
        return;
    }
    if (stepCounterCalledLoop ==false)
    { 
      stepCounter++;
    }
    
  }
  render() {
    const { array, left, right, mid, maxCount} = this.props;
    
    const leftSorted = array.slice(left, mid);
    const rightSorted = array.slice(mid, right);

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
    
    loopCounterIdx = stepCounter+1;
    for (let i=0; i<= sorted.length; i++){
      this.increaseStepCounterLoop(sorted.length, i);

    }
    let diff = maxCount-loopCounterIdx;
    let onebyone = sorted.slice(0, diff);


    return (
      <div>
      {diff>0 && (<List values={onebyone} />)}
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


  increaseStepCounter(){
    if (stepCounterCalled ==false)
    { 
      stepCounter++;
      stepCounterCalled = true;
    }
    else
      stepCounterCalled = false;
  }

  nextStep () {
    const { array, left, right, maxCount } = this.props;
    const chunk = array.slice(left, right);
    this.increaseStepCounter();
    
    return (      
      <div className="input">

        {stepCounter<maxCount && (<List values={chunk}/>)}
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
      maxCount: 1,
    };
    
  }




 

  handleClick (){
    stepCounter =0;
    let newcount = this.state.maxCount +1;
    this.setState({
      maxCount: newcount
    });
  }
  render() {
    let array = [...arrayGlobal];
    const arrayc = [...array];
    console.log(array);
    let steps = generateMergeSteps(arrayc);
    console.log(steps);
    
    

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
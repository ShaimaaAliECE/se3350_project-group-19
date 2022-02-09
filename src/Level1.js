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


class ListSplit extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired
  };

  handleClick(values, value) {
      if (values.length%2 == 0){
        if (value == values[values.length/2-1] || value == values[values.length/2]){
          console.log("correct split click");
          this.props.incrementMaxCount();
        }
        else
          console.log("wrong split click");
      }
      else{
        if (value == values[Math.floor(values.length/2)]){
          console.log("correct split click");
          this.props.incrementMaxCount();
        }
        else
          console.log("wrong split click");
      }
  }

  render() {
    const { values } = this.props;
    //console.log(values);

    return (
      <div className={'list ' + this.props.side + '-array'}>
        {values.map(value => (
          <code className="cell" key={value} onClick = {() => {this.handleClick(values, value)}}>
            {value}
          </code>
        ))}
      </div>
    );
  }
}

class ListMerge extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired
  };

  handleClick(values, value, correctMergeChoice) {
      if (value == values[correctMergeChoice])
        console.log("correct merge click");
      else
        console.log("wrong merge click");
  }

  render() {
    const { values } = this.props;
    //console.log(values);

    return (
      <div className="list">
        {values.map(value => (
          <code className="cell" key={value} onClick = {() => {this.handleClick(values, value, this.props.correctMergeChoice)}}>
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
      {diff>0 && (<ListMerge values={onebyone} correctMergeChoice = {diff} />)}
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
            <MergeSort {...this.props} right={mid} currCount = {0} side='left' />
            <MergeSort {...this.props} left={mid} currCount = {0} side='right'   />
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

        {stepCounter<maxCount && (<ListSplit side={this.props.side} values={chunk} incrementMaxCount = {() => this.props.incrementMaxCount()} />)}
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

class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      proceed: true,
      maxCount: 2,
    };
    
  }




 

  handleClick (){
    stepCounter =0;
    let newcount = this.state.maxCount +1;
    this.setState({
      maxCount: newcount
    });
    //console.log(stepCounter);
    console.log(this.state.maxCount);
  }
  render() {
    let array = [...arrayGlobal];
    const arrayc = [...array];
    //console.log(array);
    let steps = generateMergeSteps(arrayc);
    //console.log(steps);

    // Check for level completion
    if (this.state.maxCount >= steps.length)
    {
      console.log('Level Complete');
    }
    

    return (
      <>
        <header>
          <h1>Sortin' Level 1</h1>
          <button onClick = {() => this.handleClick()}>
            {"next step"}
          </button>
          <Instructions instruct = {steps[Math.min(steps.length-1, this.state.maxCount-2)].instruction}/>
        </header>
      
        <section>


          <MergeSort array={array} left={0} right={array.length} maxCount = {this.state.maxCount} incrementMaxCount = {() => this.handleClick()}/>
        </section>
      </>
    );
  }
}

export default Level1;
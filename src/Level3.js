import React, { Component } from "react";
import generateMergeSteps from "./sort";
import generateRandomArray from "./rand_array";
import ListSplit from "./ListSplit";
import ListMerge from "./ListMerge";
import GoBackList from "./GoBackList"
import TimerComponent from "./TimerComponent";
import './index.css';
import ModalPopup from './modal_popup';
import HeartDisp from './HeartDisp';

//Global variable to control flow
var stepCounter = 0;
var loopCounterIdx = 0;
var stepCounterCalled = false;
var stepCounterCalledLoop = false;
var arrayGlobal = generateRandomArray(10, 20);
var totalSteps = 0;


class Join extends Component {

  increaseStepCounterLoop(length, i) {
    if (i == length) {
      stepCounterCalledLoop = !stepCounterCalledLoop;
      return;
    }
    if (stepCounterCalledLoop == false) {
      stepCounter++;
    }

  }

  reduceLives() {
    this.props.parentCallbackFinal(true);
  }

  render() {
    const { array, left, right, mid, maxCount } = this.props;

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

    loopCounterIdx = stepCounter + 1;
    for (let i = 0; i <= sorted.length; i++) {
      this.increaseStepCounterLoop(sorted.length, i);

    }
    let diff = maxCount - loopCounterIdx;
    let onebyone = sorted.slice(0, diff);


    return (
      <div>
        {diff > 0 && (<ListMerge values={onebyone} parentCallback = {() => this.reduceLives()} incrementMaxCount={() => this.props.incrementMaxCount()} maxCount={maxCount} levelOfRecursion={this.props.levelOfRecursion} steps={this.props.steps} />)}
      </div>
    );
  }
}

class MergeSort extends Component {

  recurse() {

    let { array, left, right, maxCount } = this.props;
    const chunk = array.slice(left, right);
    const mid = left + Math.floor(chunk.length / 2);




    return (
      <div>

        {chunk.length != 1 && (

          <>
            <MergeSort {...this.props} right={mid} currCount={0} levelOfRecursion={this.props.levelOfRecursion + 1} />
            <MergeSort {...this.props} left={mid} currCount={0} levelOfRecursion={this.props.levelOfRecursion + 1} />
            <div className="join">
              <Join {...this.props} mid={mid} currCount={0} levelOfRecursion={this.props.levelOfRecursion - 1} />
            </div>

          </>
        )}
      </div>
    );
  }

  reduceLives() {
    this.props.parentCallbackFinal(true);
  }

  increaseStepCounter() {
    if (stepCounterCalled == false) {
      stepCounter++;
      stepCounterCalled = true;
    }
    else
      stepCounterCalled = false;
  }

  nextStep() {
    const { array, left, right, maxCount } = this.props;
    const chunk = array.slice(left, right);
    this.increaseStepCounter();
    if (chunk.length > 1) {
      return (
        <div className="input">

          {stepCounter < maxCount && (<ListSplit values={chunk} parentCallback = {() => this.reduceLives()} incrementMaxCount={() => this.props.incrementMaxCount()} maxCount={maxCount} levelOfRecursion={this.props.levelOfRecursion} steps={this.props.steps} />)}
        </div>
      );
    }
    else {
      return (
        <div className="input">

          {stepCounter < maxCount && (<ListMerge values={chunk} parentCallback = {() => this.reduceLives()} incrementMaxCount={() => this.props.incrementMaxCount()} maxCount={maxCount} levelOfRecursion={this.props.levelOfRecursion - 1} steps={this.props.steps} />)}
        </div>
      );

    }
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




class Level3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      proceed: true,
      maxCount: 2,
      complete: false
    };
    this.timerElement = React.createRef();
    this.title = "Game Over";
    this.numHearts = 3;
  }

  reduceLives() {
    this.numHearts--; 
    if(this.numHearts==0){
      this.setState({ showModalPopup: true });
    }
    console.log(this.numHearts);
  }

  isShowPopup = (status) => {  
    this.setState({ showModalPopup: status });
  };

  handleClick() {
    stepCounter = 0;
    let newcount = this.state.maxCount + 1;
    let end = newcount > totalSteps;
    this.setState({
      maxCount: newcount,
      complete: end
    });
    // Check for level completion
    let array = [...arrayGlobal];
    const arrayc = [...array];
    let steps = generateMergeSteps(arrayc);
    if (this.state.maxCount >= steps.length) {
      this.handleLevelComplete();
    }
  }

  reset() {
    stepCounter = 0;
    this.setState({
      maxCount: 2,
      complete: false
    });
    console.log('reset');
    this.timerElement.current.resetTimer();
  }

  handleLevelComplete = () => {
    console.log('Level Complete');
    this.timerElement.current.setTimerOn(false);
    this.setState({ showModalPopup: true });
    this.title = "Level Completed!"
  };

  render() {
    let array = [...arrayGlobal];
    const arrayc = [...array];
    let steps = generateMergeSteps(arrayc);
    console.log(steps);
    totalSteps = steps.length;



    return (
      <>
        <header>
          <h1 style={{ backgroundColor: "lightblue", padding: "10px" }}>Sortin'</h1>
          <h1>Level 3</h1>

          <HeartDisp
            numHearts = {this.numHearts}>
          </HeartDisp>


          <br></br>
          <TimerComponent ref={this.timerElement} />
          <br></br>

          <GoBackList />
          <form action="/">
            <input type="submit" value="Quit" />
          </form>
          <button onClick={() => this.reset()}>Reset Level</button>
          {this.state.complete && <h2>The array is sorted. Level complete!</h2>}
        </header>

        <section>


          <MergeSort array={array} left={0} right={array.length} maxCount={this.state.maxCount} parentCallbackFinal = {() => this.reduceLives()} incrementMaxCount={() => this.handleClick()} steps={steps} levelOfRecursion={0} />
        </section>

        <div  
  
            onClick={() => this.isShowPopup(true)}>  
            <button>Modal Pop up</button>  
          </div>  
          
          <ModalPopup  
            showModalPopup={this.state.showModalPopup}  
            onPopupClose={this.isShowPopup} 
            title={this.title}
          ></ModalPopup>
      </>
    );
  }
}

export default Level3;
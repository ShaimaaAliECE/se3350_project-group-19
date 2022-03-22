import React, { Component } from "react";
import generateMergeSteps from "./sort";
import generateRandomArray from "./rand_array";
import Instructions from "./Instructions";
import ListSplit from "./ListSplit";
import ListMerge from "./ListMerge";
import TimerComponent from "./TimerComponent";
import compareTwoNums from "./compareTwoNums";
import DisplayTwoNums from "./displayTwoNums";
import IdleTimerContainer from './IdleTimerContainer';
import ModalPopup from './modal_popup';

//Global variable to control flow
var stepCounter = 0;
var loopCounterIdx = 0;
var arrayGlobal = generateRandomArray(10, 20);
class Join extends Component {

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
      stepCounter++;
    }
    stepCounter--;
    let diff = maxCount - loopCounterIdx;
    let onebyone = sorted.slice(0, diff);

    return (
      <div>
        {diff > 0 && (<ListMerge values={onebyone} maxCount={maxCount} levelOfRecursion={this.props.levelOfRecursion} steps={this.props.steps} />)}
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

          <div>
            <MergeSort {...this.props} right={mid} currCount={0} levelOfRecursion={this.props.levelOfRecursion + 1} />
            <MergeSort {...this.props} left={mid} currCount={0} levelOfRecursion={this.props.levelOfRecursion + 1} />
            <div className="join">
              <Join {...this.props} mid={mid} currCount={0} levelOfRecursion={this.props.levelOfRecursion - 1} />
            </div>

          </div>
        )}
      </div>
    );
  }

  nextStep() {
    const { array, left, right, maxCount } = this.props;
    const chunk = array.slice(left, right);
    stepCounter++;
    if (chunk.length > 1) {
      return (
        <div className="input">

          {stepCounter < maxCount && (<ListSplit values={chunk} maxCount={maxCount} levelOfRecursion={this.props.levelOfRecursion} steps={this.props.steps} />)}
        </div>
      );
    }
    else {
      return (
        <div className="input">

          {stepCounter < maxCount && (<ListMerge values={chunk} maxCount={maxCount} levelOfRecursion={this.props.levelOfRecursion - 1} steps={this.props.steps} />)}
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




class Level1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      proceed: true,
      maxCount: 2,
    };
    this.timerElement = React.createRef();
    this.title = "Game Over";
  }

  isShowPopup = (status) => {  
    this.setState({ showModalPopup: status });
  };

  handleClick() {
    stepCounter = 0;
    let newcount = this.state.maxCount + 1;
    this.setState({
      maxCount: newcount
    });
    console.log(this.state.maxCount);

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
      maxCount: 2
    });
    console.log('reset');
    this.timerElement.current.resetTimer();
  }

  handleLevelComplete = () => {
    console.log('Level Complete');
    this.timerElement.current.setTimerOn(false);
    fetch(`/add-log-entry?completed=1&mistakes=0&timeSpent=${this.timerElement.current.state.time}`).then((result) => {console.log(result)});
    this.setState({ showModalPopup: true });
    this.title = "Level Completed!"  
  };

  render() {
    let array = [...arrayGlobal];
    const arrayc = [...array];
    const arraycomp = [...array];
    let steps = generateMergeSteps(arrayc);
    let comp = compareTwoNums(arraycomp);

    //Setting the starting position to middle 
    let mid = document.body.scrollWidth/2*0.65;
    document.documentElement.scrollLeft = document.body.scrollLeft = mid;

    return (
      <div>
        <IdleTimerContainer></IdleTimerContainer>
        <header>
          <h1 style={{ backgroundColor: "lightblue", padding: "10px" }}>Sortin'</h1>
          <h1>Level 1</h1>

          <br></br>
          <TimerComponent ref={this.timerElement} />
          <br></br>

          

          <button onClick={() => this.reset()}>Reset</button>

          <form action="/">
            <input type="submit" value="Quit" />
          </form>

          <Instructions instruct = {steps[Math.min(steps.length - 1, this.state.maxCount - 2)].instruction}/>
          <button onClick={() => this.handleClick()}>
            {"next step"}
          </button>
          <br></br>
          <br></br>
          <DisplayTwoNums compare = {comp[Math.min(comp.length - 1, this.state.maxCount - 2)].instruction}/>
          
          

        </header>
        <section>
          <MergeSort array={array} left={0} right={array.length} maxCount={this.state.maxCount} steps={steps} levelOfRecursion={0} />
        </section>

        
        <ModalPopup  
            showModalPopup={this.state.showModalPopup}  
            onPopupClose={this.isShowPopup} 
            title={this.title}
          ></ModalPopup>

      </div>
    );
  }
}

export default Level1;
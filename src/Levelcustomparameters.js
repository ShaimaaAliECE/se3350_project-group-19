import React, { Component } from "react";
import generateMergeSteps from "./sort";
import generateRandomArray from "./rand_array";
import ListSplit from "./ListSplit";
import ListMerge from "./ListMerge";
import GoBackList from "./GoBackList"
import TimerComponent from "./TimerComponent";
import IdleTimerContainer from './IdleTimerContainer';
import ModalPopup from './modal_popup';




class LevelCustomParameters extends Component {

    // setRandomArray = (arrayLength, arrayRange) => {
    //     arrayLength = lengthGlobal;
    //     arrayRange = rangeGlobal;
    //     arrayGlobal = generateRandomArray(lengthGlobal, rangeGlobal);
    // };

    async setRandomArray(l, r) {
        window.lengthGlobal = l;
        window.rangeGlobal = r;
        console.log(window.lengthGlobal + " " + window.rangeGlobal);

        await new Promise((r) => setTimeout(r, 2000));
        window.location.href = window.location.protocol + "//" + window.location.host + "/";
    };

    render() {
        return (
            <div>
                <IdleTimerContainer></IdleTimerContainer>
                <header>
                    <h1 style={{ backgroundColor: "lightblue", padding: "10px" }}>Sortin'</h1>
                    <h1>Custom Level</h1>
                </header>

                <section>
                    {/* <form name="customLevel"> */}
                    <form name="customLevel" 
                    // onSubmit={async (values) => {
                    //     await new Promise((r) => setTimeout(r, 2000));
                    //     window.location.href = window.location.protocol + "//" + window.location.host + "/";
                    // }}
                    >
                        <label>Array length: </label>
                        <input id="arrayLength" type="number" name="arrayLength" min="2" max="50"></input>
                        <br />
                        <label>Maximum integer in the range: </label>
                        <input id="arrayRange" type="number" name="arrayRange" min="document.getElementById('arrayLength').value" max="50"></input>
                        <br />
                        <input type="submit" value="Submit" onClick={() => this.setRandomArray(document.getElementById('arrayLength').value, document.getElementById('arrayRange').value)}></input>
                    </form>
                </section>
            </div>
        );
    }
}
export default LevelCustomParameters;
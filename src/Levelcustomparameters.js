// import React, { Component } from "react";
// import generateMergeSteps from "./sort";
// import generateRandomArray from "./rand_array";
// import ListSplit from "./ListSplit";
// import ListMerge from "./ListMerge";
// import GoBackList from "./GoBackList"
// import TimerComponent from "./TimerComponent";
// import IdleTimerContainer from './IdleTimerContainer';
// import ModalPopup from './modal_popup';

// var lengthGlobal;
// var rangeGlobal;

// class LevelCustomParameters extends Component {

//     // setRandomArray = (arrayLength, arrayRange) => {
//     //     arrayLength = lengthGlobal;
//     //     arrayRange = rangeGlobal;
//     //     arrayGlobal = generateRandomArray(lengthGlobal, rangeGlobal);
//     // };

//     async setRandomArray() {
//         // window.lengthGlobal = l;
//         // window.rangeGlobal = r;
//         // console.log(window.lengthGlobal + " " + window.rangeGlobal);

//         await new Promise((r) => setTimeout(r, 500));
//         window.location.href = window.location.protocol + "//" + window.location.host + "/";
//     };

//     render() {
//         return (
//             <div>
//                 <IdleTimerContainer></IdleTimerContainer>
//                 <header>
//                     <h1 style={{ backgroundColor: "lightblue", padding: "10px" }}>Sortin'</h1>
//                     <h1>Custom Level</h1>
//                 </header>

//                 <section>
//                     {/* <form name="customLevel"> */}
//                     <form 
//                     onSubmit={async (values) => {
//                         await new Promise((r) => setTimeout(r, 500));
//                         window.location.href = window.location.protocol + "//" + window.location.host + "/";
//                     }}
//                     >
//                         <label>Array length: </label>
//                         <input id="arrayLength" type="number" name="arrayLength" min="2" max="50"></input>
//                         <br />
//                         <label>Maximum integer in the range: </label>
//                         <input id="arrayRange" type="number" name="arrayRange" min="document.getElementById('arrayLength').value" max="50"></input>
//                         <br />
//                         {/* <input type="submit" value="Submit" onClick={() => this.setRandomArray(document.getElementById('arrayLength').value, document.getElementById('arrayRange').value)}></input> */}
//                         <button type="submit">Submit</button>
//                     </form>
//                 </section>
//             </div>
//         );
//     }
// }
// export default LevelCustomParameters;


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Formik, Field, Form } from 'formik';

var lengthGlobal;
var rangeGlobal;

function LevelCustomParameters() {
    return (
        <div>
            <h1 style={{ backgroundColor: "lightblue", padding: "10px" }}>Sortin'</h1>
            <h1>Custom Level</h1>

            <Formik
                initialValues={{
                    arrayLength: 2,
                    arrayRange: 2
                }}
                onSubmit={async (values) => {
                    lengthGlobal = values.arrayLength;
                    rangeGlobal = values.arrayRange;
                    console.log(lengthGlobal + " " + rangeGlobal);

                    await new Promise((r) => setTimeout(r, 500));
                    window.location.href = window.location.protocol + "//" + window.location.host + "/levelcustom";

                    // await new Promise((r) => setTimeout(r, 500));
                    // window.location.href = window.location.protocol + "//" + window.location.host + "/";
                }}
            >
                <div>
                    <Form>
                        <label>Array length: </label>
                        <Field as="input" name="arrayLength" type="number" min="2" max="50">

                            {/* <input id="arrayLength" type="number" value="arrayLength" min="2" max="50"></input> */}
                        </Field>
                        <br />
                        <label>Maximum integer in the range: </label>
                        <Field as="input" name="arrayRange" type="number" min="2" max="50">
                            {/* <input id="arrayRange" type="number" value="arrayRange" min="document.getElementById('arrayLength').value" max="50"></input> */}
                        </Field>
                        <br />
                        <button type="submit">Submit</button>
                    </Form>
                </div>
            </Formik>
        </div>
    );
}

export default LevelCustomParameters;

export {lengthGlobal, rangeGlobal}; // List of exported variables
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Formik, Field, Form } from 'formik';

function LevelCustomParameters() {
    
    //centering the scrolling position when visit
    let mid = document.body.scrollWidth/2*0.63;
    document.documentElement.scrollLeft = document.body.scrollLeft = mid;

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
                    var lengthGlobal = values.arrayLength;
                    var rangeGlobal = values.arrayRange;
                    console.log(lengthGlobal + " " + rangeGlobal);

                    await new Promise((r) => setTimeout(r, 500));
                    if (lengthGlobal > rangeGlobal) {
                        alert("Array length cannot be greater than the range.");
                    } else {
                        window.location.href = window.location.protocol + "//" + window.location.host + "/levelcustom?length=" + lengthGlobal + "&range=" + rangeGlobal;
                    }
                }}
            >
                <div>
                    <Form>
                        <label>Array length: </label>
                        <Field as="input" name="arrayLength" type="number" min="2" max="50"></Field>
                        <br />
                        <label>Maximum integer in the range: </label>
                        <Field as="input" name="arrayRange" type="number" min="document.getElementById('arrayLength').value" max="100"></Field>
                        <br />
                        <button type="submit">Submit</button>
                    </Form>
                </div>
            </Formik>
        </div>
    );
}

export default LevelCustomParameters;
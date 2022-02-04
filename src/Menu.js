import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Formik, Field, Form } from 'formik';

const Menu = () => (
    <div>
      <h1 h1 style={{backgroundColor: "lightblue", padding: "10px"}}>Sortin'</h1>
  
      <Formik
        initialValues={{
          level: 'one',
          algorithm: 'mergeSort',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
  
          // window.location.href = "http://google.com"
          // window.location.replace("http://localhost:5500/src/level" + values.level + ".html");
           window.location.href = "http://localhost:3000/level" + values.level 
          // return false;
        }}
      >
        <body>
        <Form>
          {/* Radio Button Idea */}
            {/* <div id="my-radio-group">Choose a Level: </div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="level" value="one" checked />
                One
              </label>
              <br />
              <label>
                <Field type="radio" name="level" value="two" />
                Two
              </label>
            </div> 
            
            <br />
            <br />
  
            <div id="my-radio-group2">Choose a Sorting Algorithm: </div>
            <div role="group">
              <label>
                <Field type="radio" name="algorithm" value="mergeSort" checked />
                Merge Sort
              </label>
            </div>
  
            <br />*/}
  
            <div id="levelSelect">Choose a Level: </div>
            <div role="group">
              <label>
                <Field as="select" name="level" size="3">
                <option value="one">Level 1</option>
                <option value="two">Level 2</option>
                {/* <option value="three">Level 3</option> */}
                </Field>
              </label>
            </div>
  
            <br />
  
            <div id="algorithmSelect">Choose a Sorting Algorithm: </div>
            <div role="group">
              <label>
                <Field as="select" name="algorithm" size="3">
                <option value="mergeSort">Merge Sort</option>
                </Field>
              </label>
            </div>
            
            <br />
  
            <button type="submit">Submit</button>
          </Form>
          </body>
      </Formik>
    </div>
  );
  
  export default Menu
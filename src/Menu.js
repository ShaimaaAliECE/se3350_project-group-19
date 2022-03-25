import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Formik, Field, Form } from 'formik';

function Menu() {
  var mid = window.innerWidth/2 * 1.6
  var Scroll = require('react-scroll');
    var scroll = Scroll.animateScroll;
    scroll.scrollTo(mid, {horizontal: true, duration: 2});
  return (
    
    <div>
      <h1 h1 style={{ backgroundColor: "lightblue", padding: "10px" }}>Sortin'</h1>
      
      <br />
      <button onClick={() => {window.location.assign('/admin')}}>Admin Portal</button>
      <br />
      <br />

      <Formik
        initialValues={{
          level: 'one',
          algorithm: 'mergeSort',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          window.location.href = window.location.protocol + "//"+ window.location.host + "/level" + values.level
        }}
      >
        <div>
          <Form>
            <div id="levelSelect">Choose a Level: </div>
            <div role="group">
              <label>
                <Field as="select" name="level" size="3">
                <option value="one">Level 1</option>
                <option value="two">Level 2</option>
                <option value="three">Level 3</option>
                <option value="four">Level 4</option>
                <option value="five">Level 5</option>
                <option value="customparameters">Custom Level</option>
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
        </div>
      </Formik>
    </div>
  );
}

export default Menu;
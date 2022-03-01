import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Formik, Field, Form } from 'formik';

// function levelDetect(props) {
//     let url = window.location.href

//     if (url == "localhost:3000/leveltwo"){
//         return (
//             <div>
//                 <option value="one">Level 1</option>
//             </div>
//         )
//     }
//     if (url == "localhost:3000/levelthree"){
//         return (
//             <div>
//                 <option value="one">Level 1</option>
//                 <option value="two">Level 2</option>
//             </div>
//         )
//     }

// }

function GoBackList (){
console.log(window.location.protocol + window.location.host + "/leveltwo")
  return(
    <div>
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
           window.location.href = window.location.protocol + "//"+ window.location.host + "/level" + values.level 
          // return false;
        }}
      >
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
  
            <div id="levelSelect">Or Choose a Previous Level: </div>
            <div role="group">
              <label>
                <Field as="select" name="level" size="3">
                {window.location.href ==  window.location.protocol + "//"+ window.location.host + "/leveltwo" &&
                    <option value="one">Level 1</option>
                 }
                {window.location.href ==   window.location.protocol + "//"+ window.location.host + "/levelthree" &&
                    <option value="one">Level 1</option>
                 }
                 {window.location.href ==   window.location.protocol  + "//"+ window.location.host + "/levelthree" &&
                    <option value="two">Level 2</option>
                 }
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
  
            <button type="submit">Go Back</button>
          </Form>
      </Formik>
    </div>
  );
          }
  
  export default GoBackList
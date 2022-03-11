import React, { Component } from "react";
import PropTypes from "prop-types";
import generateMergeSteps from "./sort";
import generateRandomArray from "./rand_array";
import Level1 from "./Level1.js";
import { Routes, Route, Link } from "react-router-dom";
import Menu from "./Menu.js"
import Level2 from "./Level2.js";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";


//Global variable to control flow
function App() {
  return (
    <div className = "App">
    <Routes>
      <Route path="/" exact element = {<Menu/>} />
      <Route path="/levelone" element = {<Level1/>} />
      <Route path="/leveltwo" element = {<Level2/>} />
      <Route path="/levelthree" element = {<Level3/>} />
      <Route path="/levelfour" element = {<Level4/>} />
      <Route path="/levelfive" element = {<Level5/>} />
    </Routes>
    </div>
  );
}

export default App
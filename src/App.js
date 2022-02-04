import React, { Component } from "react";
import PropTypes from "prop-types";
import generateMergeSteps from "./sort";
import generateRandomArray from "./rand_array";
import Level1 from "./Level1.js";
import { Routes, Route, Link } from "react-router-dom";
import Menu from "./Menu.js"

//Global variable to control flow
function App() {
  return (
    <div className = "App">
    <Routes>
      <Route path="/" elemenet = {Menu} />
      <Route path="/levelone" element = {<Level1/>} />
    </Routes>
    </div>
  );
}

export default App
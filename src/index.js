import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.scss';
import App from './App.js';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Formik, Field, Form } from 'formik';


ReactDOM.render(
<React.StrictMode>
<BrowserRouter>
<App/>
</BrowserRouter>
</React.StrictMode>
, 
document.getElementById('root')
);
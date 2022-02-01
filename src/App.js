import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component() {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
  }

  randNum(){
    let numbers = [];
    for (let i= 0; i < 10 ;i++){
      numbers.push(Math.floor(Math.random() * 10));
    }
    const listItems = numbers.map((number) =>
      <li>{number}</li>
      );
      
    return listItems
  }

  render(){ 
    return (
    <div>
      <ul>{this.randNum()}</ul>
      <button>Next</button>
    </div>
    )
  }
}

export default App;

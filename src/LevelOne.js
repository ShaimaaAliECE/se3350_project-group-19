
import React from 'react'

class LevelOne extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        random: null,
        randomList: [],
      }
    }
  
    min = 1;
    max = 100;
  
    handleClick = () => {
      this.setState({random: Math.random()});
      let tempList = []
      for (let i = 0 ; i < 10 ; i++){
        tempList.push(Math.floor(Math.random()*10))
      }
      this.setState({randomList: tempList})
    };
  
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Click me</button>
          {/* {this.state.random} */}
          <ul>
            {this.state.randomList.map(function(item, i){
            console.log('test');
            return <li key={i}>{item}</li>
            })
        }
        </ul>
        </div>
      );
    }
  }

  export default LevelOne
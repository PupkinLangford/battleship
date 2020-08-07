import React from 'react';
import './App.css';
import Board from './components/board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: false, pregame: true};
    this.nextTurn = this.nextTurn.bind(this);
  }

  nextTurn() {
    this.setState({...this.state, turn: !this.state.turn});
  }

  startGame = () => {
    if(this.state.pregame) {
      this.setState({...this.state, pregame: false});
    }
  }

  render() {
    return ( 
      <div className="App">
        <Board pregame={this.state.pregame} cpu={true} nextTurn={this.nextTurn} turn={this.state.turn}/>
        <Board pregame={this.state.pregame} cpu={false} nextTurn={this.nextTurn} turn={this.state.turn}/>
        <button onClick={this.startGame}>Start Game</button>
      </div>
    );
  }
}

export default App;

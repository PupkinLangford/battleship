import React from 'react';
import './App.css';
import Board from './components/board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: false, pregame: true, winner: ''};
    this.nextTurn = this.nextTurn.bind(this);
  }

  nextTurn(boardWinner) {
    this.setState({...this.state, turn: !this.state.turn, winner: this.state.winner || (boardWinner ? 'Game Over' : '')});
  }


  startGame = () => {
    if(this.state.pregame) {
      this.setState({...this.state, pregame: false});
    }
  }

  render() {
    return ( 
      <div className="App">
        <h1>Battleship</h1>
        <div className="boards">
          <Board pregame={this.state.pregame} cpu={true} nextTurn={this.nextTurn} turn={this.state.turn}/>
          <Board pregame={this.state.pregame} cpu={false} nextTurn={this.nextTurn} turn={this.state.turn}/>
        </div>
        <button onClick={this.startGame}>Start Game</button>
        <h2>{this.state.winner}</h2>
      </div>
    );
  }
}

export default App;

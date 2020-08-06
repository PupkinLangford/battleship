import React from 'react';
import './App.css';
import Board from './components/board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: false};
    this.nextTurn = this.nextTurn.bind(this);
  }

  nextTurn() {
    this.setState({...this.state, turn: !this.state.turn});
  }

  render() {
    return ( 
      <div className="App">
        <Board cpu={true} nextTurn={this.nextTurn} turn={this.state.turn}/>
        <Board cpu={false} nextTurn={this.nextTurn} turn={this.state.turn}/>
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/board';
import Player from './game/Player';

class App extends React.Component {
  constructor(props) {
    super(props);
    const plyr = new Player();
    const cpu = new Player();
    this.state = {player: plyr, computer: cpu};
  }
  render() {
    return ( 
      <div className="App">
        <Board cpu={true}/>
        <Board cpu={false}/>
      </div>
    );
  }
}

export default App;

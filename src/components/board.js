import React from 'react';
import Player from '../game/Player';
import './board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const plyr = new Player();
        this.state = {player: plyr};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i, j) {
        if (this.props.cpu || this.props.turn) return;
        try {
            this.state.player.attack(i, j);
            this.setState({...this.state}); // might need to worry about this order
            this.props.nextTurn();
        }
        catch (err) {
            console.log(err);
        }
      }

    
    componentDidUpdate() {
        if (this.props.cpu && this.props.turn) {
            this.state.player.randomAttack();
            this.setState({...this.state});
            this.props.nextTurn();
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let color = '';
                let inner = '';
                if (this.props.cpu && this.state.player.getBoard().shipLocs[i][j] !== false){
                    color = 'blue';
                }
                if (this.state.player.getBoard().shipLocs[i][j] !== false && this.state.player.getBoard().hitMatrix[i][j]) {
                    color = 'red';
                }
                else if (this.state.player.getBoard().hitMatrix[i][j]){
                    inner = '.';
                }
            squares.push(<div className={color} onClick={()=> this.handleClick(i,j)}>{inner}</div>)
            }
        }
        return <div className = 'container'>{squares}</div>;
    }
}

export default Board;

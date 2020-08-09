import React from 'react';
import Player from '../game/Player';
import './board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const plyr = new Player();
        this.state = {player: plyr};
        this.handleClick = this.handleClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleClick(i, j) {
        if (this.props.cpu || this.props.turn || this.props.pregame) return;
        try {
            this.state.player.attack(i, j);
            this.setState({...this.state});
            this.props.nextTurn(this.state.player.wonGame());
        }
        catch (err) {
            console.log("Location already clicked");
        }
      }

    
    handleDrag(i, j) {
        if(!this.props.cpu || !this.props.pregame) return;
        console.log('dragging' + i  + j);
    }

    componentDidMount() {
        if (!this.props.cpu && this.props.pregame) {
            this.state.player.randomize();
        }
    }
    
    componentDidUpdate() {
        if (this.props.cpu && this.props.turn) {
            this.state.player.randomAttack();
            this.setState({...this.state});
            this.props.nextTurn(this.state.player.wonGame());
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
                    inner = 'X';
                }
                else if (this.state.player.getBoard().hitMatrix[i][j]){
                    inner = '.';
                }
            squares.push(<div key={[i, j]} className={color} 
                onDrag={()=> this.handleDrag(i, j)} onClick={()=> this.handleClick(i,j)}>{inner}</div>)
            }
        }
        return <div className = 'container'>{squares}</div>;
    }
}

export default Board;

import React from 'react';
import Player from '../game/Player';
import './board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const plyr = new Player();
        this.state = {player: plyr, dragging: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    shouldComponentUpdate() {
        return !this.props.winner;
    }

    handleClick(i, j) {
        if(this.props.cpu && this.props.pregame) {
            if (this.state.player.getBoard().shipLocs[i][j] !== false) {
                this.state.player.oppBoard.rotateShip(this.state.player.getBoard().shipLocs[i][j]);
                this.setState({...this.state});
            }
        }
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
        if(!this.props.cpu || !this.props.pregame || this.state.player.getBoard().shipLocs[i][j] === false) return;
        this.setState({...this.state, dragging: this.state.player.getBoard().shipLocs[i][j]});
    }

    handleDrop(i, j) {
        if(!this.props.cpu || !this.props.pregame) return;
        this.state.player.oppBoard.placeShip(this.state.dragging, i, j, this.state.player.oppBoard.ships[this.state.dragging].pos[2]);
        this.setState({...this.state, dragging: false});
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
                    color = 'ship';
                }
                if (this.state.player.getBoard().shipLocs[i][j] !== false && this.state.player.oppBoard.ships[this.state.player.getBoard().shipLocs[i][j]].ship.isSunk()){
                    color = 'sunken';
                    inner = 'X';
                }
                else if (this.state.player.getBoard().shipLocs[i][j] !== false && this.state.player.getBoard().hitMatrix[i][j]) {
                    color = 'hit';
                    inner = 'X';
                }
                else if (this.state.player.getBoard().hitMatrix[i][j]){
                    inner = '.';
                }
            squares.push(<div key={[i, j]} className={color} draggable={this.state.player.getBoard().shipLocs[i][j] !== false}
                onDragStart={()=> this.handleDrag(i, j)}
                onDragOver={(e)=> e.preventDefault()}
                onClick={()=> this.handleClick(i,j)} 
                onDrop={() => this.handleDrop(i,j)}>{inner}</div>)
            }
        }
        return <div className = 'container'>{squares}</div>;
    }
}

export default Board;

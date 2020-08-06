import React from 'react';
import Player from '../game/Player';
import './board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const squares = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let color = ''
                if (this.props.player.getBoard().shipLocs[i][j] !== false) {
                    color = 'blue';
                }
                squares.push(<div className={color}></div>)
            }
        }
        return <div className = 'container'>{squares}</div>;
    }
}

export default Board;

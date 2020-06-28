import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true, //true - X, false - O
            squares: Array(9).fill(null)
        }
    }

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true
        });     
    }

    handleClick(i) {
        const squares = this.state.squares;
        const winner = calculateWinner(squares);
        if(winner || squares[i]){ //If winner is found or value exists in square, no action should be performed
            return
        }
        squares[i] = this.state.xIsNext? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext //Change to next player
        });
    }

    render() {
        const squares = this.state.squares;
        const winner = calculateWinner(squares);
        //Checking to see if the whole board is filled, if there is any null value, notFullBoard = true
        const notFullBoard = squares.some(function(el){
            return el===null;
        });

        return (
            <div className="game">
                <div>
                    <h1 className="title"> Tic - Tac - Toe </h1>
                    {/* If winner exists: Winner */}
                    {winner && <h3 className="winner">{winner==='X'? <p>Winner is Player 1 (X)</p> : <p>Winner is Player 2 (O)</p>}</h3>}
                    {/* Full board and still no winner : Tie */}
                    {!notFullBoard && winner===null && <h3 className="tie">Tie</h3>}
                </div>
                <div>
                  {/* Not Full board and still no winner : Keep playing */}
                  {notFullBoard && winner === null ? (<h4 className="turns"> {!this.state.xIsNext? <p>Your turn: Player 2 (O)</p> : <p>Your turn: Player 1 (X)</p>}</h4>) : ''}
                </div>
                <Board squares={squares} onClick={(i)=> this.handleClick(i)}/>
                <br/>
                <button className="resetGame" onClick={()=>this.resetGame()}>Reset Game</button>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
            return squares[a]; //winning condition achieved
        }
    }
    return null; //default-when no winner
}
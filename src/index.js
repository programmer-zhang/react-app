/**
 * @file react index.js
 * @author savuer
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className='square'
                onClick={() => {
                    this.props.onClick();
                }
            }>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />;
    }
    render() {
        return (
            <div>
                <div className='status'>{this.props.status}</div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            history: []
        };
    }
    handleClick(i) {
        const squares = JSON.parse(JSON.stringify(this.state.squares));
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            history: this.state.history.concat([squares])
        }, () => {
        });
    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    jumpTo(move) {
        let setpNumber = 0;
        move.forEach(item => {
            item && setpNumber++;
        });
        this.setState({
            squares: move,
            xIsNext: !(setpNumber % 2)
        });
    }
    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        if (winner) {
            status = 'winner: ' + (!this.state.xIsNext ? 'X' : 'O');
        }
        let currentStep = [];
        let moves = '暂无动作';
        if (this.state.history && this.state.history.length) {
            currentStep = this.state.history[this.state.history.length - 1];
            moves = this.state.history.map((item, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => this.jumpTo(item)}>{'第' + (index + 1) + '步: ' + JSON.stringify(item)}</button>
                    </li>
                );
            });
        }
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        status={status}
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{
                        /* status */
                    }</div>
                    <ol>{
                        moves
                    }</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

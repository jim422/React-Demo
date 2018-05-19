import React, { Component } from 'react'
import Board from './Board.js'

class Game extends Component {
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			xIsNext: true,
			stepNumber: 0
		}
	}
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		//如果有获胜者或者点击的方格是有值得->点击过的
		if (calculateWinner(squares) || squares[i]) {
			return
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat({
				squares: squares
			}),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		})
	}
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ? false : true
		})
	}
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			console.log(step, move);
			const desc = move ?
				'Move #' + move:
				'Game Start';
			return (
				<li key={ move }>
					<a href="#" onClick={ (e) => this.jumpTo(move) }>{ desc }</a>
				</li>
			)
		})

		let status;

		if (winner) {
			status = "winner" + winner;
		} else {
			status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={ current.squares }
						onClick={ (i) => this.handleClick(i) }
					/>
				</div>

				<div className='game-info'>
					<div>{ status }</div>
					<div>{ moves }</div>
				</div>
			</div>
		)
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export default Game


import React from 'react';
import {getSolution} from '../functions/functions';

import '../styles/sudoku.css';


class Solver extends React.Component {
  constructor() {
    super();
    this.state = {
      puzzle: [
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0],
        [0,0,0, 0,0,0, 0,0,0]
      ],
      candidates: {},
      chosenNumber: 12,
      cellSelected: "90",
    }
  }

  componentDidMount = () => {
    const candidates = this.resetCandidates();
    this.setState({candidates});
  }

  resetCandidates = () => {
    const candidates = {};
    for (let row = 0; row <= 8; row++) {
      for (let col = 0; col <= 8; col ++) {
        candidates[`${row}${col}`] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }

    return candidates;
  }

  setCellClass = (row, col) => {
    const {cellSelected, puzzle, solvedPuzzle} = this.state;
    const selRow = Math.floor(+cellSelected / 10);
    const selCol = +cellSelected % 10;
    let cn = "";

    cn += (col + 1) % 3 === 0 ? " cell boxBorder-right" : " cell";
    cn += cellSelected === `${row}${col}` ? " cellSelected" : "";

    cn += (cellSelected !== '90')
      && (puzzle[row][col] === puzzle[selRow][selCol])
      ? " sameNumber"
      : "";

      return cn;
  }

  setNumberToPuzzle = (number) => {
    let {cellSelected, puzzle, candidates} = this.state;
    const row = Math.floor(+cellSelected / 10);
    const col = +cellSelected % 10;

    if ((cellSelected !== '90' && puzzle[row][col] === 0 && candidates[`${row}${col}`].includes(number))
    || (cellSelected !== '90' && number === 0)) {
      puzzle[row][col] = number;
      const newCandidates = this.resetCandidates();
      puzzle = getSolution(puzzle, newCandidates);

      this.setState({
        puzzle,
        chosenNumber: number,
        candidates: {...newCandidates},
      })
    }
  }

  render() {
    return (
      <div className="sudoku-page">
        <div className="puzzle">
          <div className="sudoku">
            {this.state.puzzle.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={(rowIndex + 1) % 3 === 0 ? "row boxBorder-bottom" : "row"}
              >
                {row.map((cell, cellIndex) => (
                  <div
                    key={`${rowIndex}${cellIndex}`}
                    className={this.setCellClass(rowIndex, cellIndex)}
                    onClick={() => this.setState({cellSelected: `${rowIndex}${cellIndex}`, chosenNumber: 12})}
                  >
                    {cell !== 0 && cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="palete">
          <div
            className={this.state.chosenNumber === 1 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(1)}>1</div>
          <div
            className={this.state.chosenNumber === 2 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(2)}>2</div>
          <div
            className={this.state.chosenNumber === 3 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(3)}>3</div>
          <div
            className={this.state.chosenNumber === 4 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(4)}>4</div>
          <div
            className={this.state.chosenNumber === 5 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(5)}>5</div>
          <div
            className={this.state.chosenNumber === 6 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(6)}>6</div>
          <div
            className={this.state.chosenNumber === 7 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(7)}>7</div>
          <div
            className={this.state.chosenNumber === 8 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(8)}>8</div>
          <div
            className={this.state.chosenNumber === 9 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(9)}>9</div>
          <div
            className={this.state.chosenNumber === 0 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(0)}>C</div>
        </div>
      </div>
    );
  }
}

export default Solver;

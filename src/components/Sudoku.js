import React from 'react';

import {candidates, createSudoku} from '../functions/functions';
import '../styles/sudoku.css';


class Sudoku extends React.Component {
  constructor() {
    super();
    this.state = {
      solvedPuzzle: [],
      defaultPuzzle: [],
      puzzle: [],
      solvedNumbers: [],
      chosenNumber: 12,
      cellSelected: "90",
    }
  }

  componentDidMount = async() => {
    const sudoku = await createSudoku(candidates, 41);
    const puzzle = sudoku[0];
    const solvedPuzzle = sudoku[1];
    const defaultPuzzle = puzzle.map(row => row.map(item => item));
    this.setState({puzzle, defaultPuzzle, solvedPuzzle}, this.numbersSolved());
  }

  setCellClass = (row, col) => {
    const {cellSelected, defaultPuzzle, puzzle, solvedPuzzle} = this.state;
    const selRow = Math.floor(+cellSelected / 10);
    const selCol = +cellSelected % 10;
    let cn = "";

    cn += (col + 1) % 3 === 0 ? " cell boxBorder-right" : " cell";
    cn += cellSelected === `${row}${col}` ? " cellSelected" : "";
    cn += defaultPuzzle[row][col] !== 0 ? " setBold" : "";
    cn += (puzzle[row][col] !== solvedPuzzle[row][col])
      && (puzzle[row][col] !== 0)
      ? " errorCell"
      : "";

    cn += (cellSelected !== '90')
      && (puzzle[row][col] === puzzle[selRow][selCol])
      ? " sameNumber"
      : "";

      return cn;
  }

  setNumberToPuzzle = (number) => {
    const {cellSelected, puzzle, defaultPuzzle, solvedNumbers} = this.state
    const row = Math.floor(+cellSelected / 10);
    const col = +cellSelected % 10;

    if (cellSelected !== '90'
    && puzzle[row][col] !== (defaultPuzzle[row][col] !== 0 && defaultPuzzle[row][col])
    && !solvedNumbers.includes(number)) {
      puzzle[row][col] = number;

      this.setState({
        puzzle,
        chosenNumber: number,
      }, this.numbersSolved())
    }
  }

  isPuzzleSolved = () => {
    const {puzzle, solvedPuzzle} = this.state;
    for (let row = 0; row <= 8; row++) {
      for (let col = 0; col <= 8; col++) {
        if (puzzle[row][col] !== solvedPuzzle[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  numbersSolved = () => {
    const {puzzle} = this.state;
    const solvedNumbers = [];
    const numbers = puzzle.flat();
    for (let i = 1; i <= 9; i++) {
      solvedNumbers.push(numbers.filter(number => number === i).length === 9 && i);
    }
    this.setState({solvedNumbers});
  }

  setPaleteClass = (number) => {
    const {solvedNumbers} = this.state;

    return solvedNumbers.includes(number)
      ? "solvedNumber"
      : this.state.chosenNumber === number
        ? "paleteNumber chosen"
        : "paleteNumber";
  }

  render() {
    if (!this.state.puzzle[0]) {
      return (<>Loading...</>)
    }

    if (this.isPuzzleSolved()) {
      return (
        <div>!!! Puzzle Solved !!!
          
        </div>
      )
    }

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
            className={this.setPaleteClass(1)}
            onClick={()=>this.setNumberToPuzzle(1)}>1</div>
          <div
            className={this.setPaleteClass(2)}
            onClick={()=>this.setNumberToPuzzle(2)}>2</div>
          <div
            className={this.setPaleteClass(3)}
            onClick={()=>this.setNumberToPuzzle(3)}>3</div>
          <div
            className={this.setPaleteClass(4)}
            onClick={()=>this.setNumberToPuzzle(4)}>4</div>
          <div
            className={this.setPaleteClass(5)}
            onClick={()=>this.setNumberToPuzzle(5)}>5</div>
          <div
            className={this.setPaleteClass(6)}
            onClick={()=>this.setNumberToPuzzle(6)}>6</div>
          <div
            className={this.setPaleteClass(7)}
            onClick={()=>this.setNumberToPuzzle(7)}>7</div>
          <div
            className={this.setPaleteClass(8)}
            onClick={()=>this.setNumberToPuzzle(8)}>8</div>
          <div
            className={this.setPaleteClass(9)}
            onClick={()=>this.setNumberToPuzzle(9)}>9</div>
          <div
            className={this.state.chosenNumber === 0 ? "paleteNumber chosen" : "paleteNumber"}
            onClick={()=>this.setNumberToPuzzle(0)}>C</div>
        </div>
      </div>
    );
  }
}

export default Sudoku;

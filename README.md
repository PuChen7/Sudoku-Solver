# Sudoku-Solver

## Synopsis
Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contains all of the digits from 1 to 9.

### Total combinations
There are 6,670,903,752,021,072,936,960 Sudoku grids. This number is provided by Bertram Felgenhauer and Frazer Jarvis in 2005.

### Generating the board using JavaScript HTML DOM Elements

## Initial Board
After doing some research, I found out that there are many ways to generate a initial board.
1. Using existing samples and swap numbers or rows and columns to get a new board.
2. Generate some random numbers and solve the board so that there's a complete game board. Then we can randomly hide some numbers.

## Algorithm
* Backtracking

* 3*3 Block validation
  ```javascript 
  board[Math.floor(3 * (row / 3) + i / 3)][Math.floor(3 * (col / 3) + i % 3)] 
  ```
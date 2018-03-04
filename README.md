# Sudoku-Solver

## Synopsis
Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contains all of the digits from 1 to 9.

### Total combinations
There are 6,670,903,752,021,072,936,960 Sudoku grids. This number is provided by Bertram Felgenhauer and Frazer Jarvis in 2005.

### Generating the form using JavaScript HTML DOM Elements
Creating and dispatching DOM events using JavaScript. Simple example: `var classAttr = document.createAttribute("class");`. 

## Initial Board
After doing some research, I found out that there are many ways to generate a initial board.
1. Using existing samples and swap numbers or rows and columns to get a new board.
2. Generate some random numbers and solve the board so that there's a complete game board. Then we can randomly hide some numbers.

## Algorithm
### Backtracking
This algorithm tries 1 trough 9 for each cell. If the number is valid, then it goes deeper. If the number is invalid, then it backs to the previous position and picks another number.

Time Complexity: O(9^m) - m is the number of empty cells

In a simpler case, if there's only one blank cell, the worst case is 9 possibilities. If there are two blank cells, then you need to walk through 9 possibilities for the first blank cell, which is 81 possibilities in total.
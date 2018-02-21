var board = [];

function getBoard(){
  
  // get each row of the board
  var grid_rows = [].slice.call(document.querySelectorAll(".row"));
  
  grid_rows.forEach(function(row,index){
    var nums;
    board.push([]);
    // each cell of the board
    row_cells = [].slice.call(row.children);
    row_cells.forEach(function(num){
      board[index].push(num.value);  
    });
  })
  return board;
};

function init(){
  // get the initialized board
  var board = getBoard();
  
  // set name attribute to the input form
  var ele = document.getElementsByClassName("cell");
  for (var i = 0; i < ele.length; i++){
    var nameAttr = document.createAttribute("name");
    nameAttr.value = i+1;
    ele[i].setAttributeNode(nameAttr);
  }
  
   // listen for input text  
  $('.container').on('input', 'input', function(){
    var $input = $(this);
    $input.attr('value', $input.val());    
  });
      
  generateSudoku(board);
  
  solve(board);
  setValue(board);
  console.log(board);
  
}

// function for generate a initialized board
function generateSudoku(board){
  for (var i = 0; i < 9; i++){
    var number = getRandomNum();
    while (board[0].includes(number)){
      number = getRandomNum();
    }
    board[0][i] = number;
  }
  
  return board;
}

// get random number between 1 to 9
function getRandomNum(){
  var number = Math.floor(Math.random() * 9) + 1;
  return number;
}

/* function for solving sudoku */
function solve(board){
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[0].length; j++){
      if(board[i][j] == ""){
        for(var c = 1; c <= 9; c++){//trial. Try 1 through 9
          if(isValid(board, i, j, c)){
            board[i][j] = c; //Put c for this cell
                    
            if(solve(board))
              return true; //If it's the solution return true
            else
              board[i][j] = ""; //Otherwise go back
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(board, row, col, c){
        for(var i = 0; i < 9; i++) {
            if(board[i][col] != "" && board[i][col] == c) return false; //check row
            if(board[row][i] != "" && board[row][i] == c) return false; //check column
            if(board[3 * Math.floor(row / 3) + Math.floor(i / 3)][ 3 * Math.floor(col / 3) + Math.floor(i % 3)] != "" && 
board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + Math.floor(i % 3)] == c) return false; //check 3*3 block
        }
        return true;
}

// hide values
function setValue(board){
  for (var i = 0; i < 20; i++){
    var x = Math.floor(Math.random() * 8) + 1; // get random number between 1 to 9
    var y = Math.floor(Math.random() * 8) + 1;
    
    board[x][y] = undefined;
  }
}
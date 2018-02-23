
var board = [];

function getBoardArray(){
  
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

// generate HTML board: using javascript to manipulate with DOM
function generateBoard(){
  for (var i = 0; i < 9; i++){    
    var node = document.createElement("div");
    var attr = document.createAttribute("class");
    attr.value = "grid row";
    node.setAttributeNode(attr);
    document.getElementById("chess-board").appendChild(node);
    
    for (var j = 0; j < 9; j++){
      var input = document.createElement("input");
      var type = document.createAttribute("type");
      type.value = "text";
      var classAttr = document.createAttribute("class");
      classAttr.value = "cell";
      var max = document.createAttribute("maxlength");
      max.value = "1";
      var change = document.createAttribute("onchange");
      change.value = "listenInput()";
      input.setAttributeNode(type);
      input.setAttributeNode(classAttr);
      input.setAttributeNode(max);
      input.setAttributeNode(change);
      
      node.appendChild(input);
    }
  }
}

// initialization
function init(){
  // generate HTML board
  generateBoard();
  // get the initialized board
  var board = getBoardArray();
  
  // set name attribute to the input form
  var ele = document.getElementsByClassName("cell");
  var i = 0;
  for (var row = 0; row < 9; row++){
    for (var col = 0; col < 9; col++){
      var nameAttr = document.createAttribute("name");
      nameAttr.value = "" + row + col;
      ele[i].setAttributeNode(nameAttr);
      i += 1;
    }
  }
  
   // listen for input text  
  $('.container').on('input', 'input', function(){
    var $input = $(this);
    $input.attr('value', $input.val());    
  });
      
  generateSudoku(board);
  solve(board);
  hideValue(board);
  setValue(board);
  listenInput(board);
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

// check if board is valid
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
function hideValue(board){
  var has = [];
  for (var i = 0; i < 40; i++){
    var x = Math.floor(Math.random() * 9); // get random number between 0 to 9
    var y = Math.floor(Math.random() * 9);
    var check = "" + x + y;
    if (!has.includes(check)){
      has.push(check);
      board[x][y] = "";
    } else {
      i -= 1;
      continue;
    }
  }
}

// set value to inputs AND make that input read only
function setValue(board){
  var ele = document.getElementsByClassName("cell");
  var count = 0;
  for (var i = 0; i < 9; i++){
    for (var j = 0; j < 9; j++){
      if (board[i][j] == ""){
        count += 1;
        continue;
      }
      var attr = document.createAttribute("value");
      attr.value = board[i][j];
      ele[count].setAttributeNode(attr);
      ele[count].readOnly = true;
      count += 1;
    }
  }
}

// listen for input and alter the board value
function listenInput(board){
  $('.cell').each(function() {
       var elem = $(this);
  
       // Look for changes in the value
       elem.on("propertychange change input", function(event){
         
         // get input value index
         var index = elem[0].getAttribute("name");
         var number = elem[0].value;
         
         var x = index.charAt(0);
         var y = index.charAt(1);
         
         //var isOK = isValid(board, x, y, number);
        
         // check input
         if (isNaN(number)){
           elem[0].style.color = "red";
         } else if (!isNaN(number)){
           elem[0].style.color = "black";
           board[x][y] = number;
           return;
         }
        
       });
     });
}
const WHITE = 'white' // a piece's side
const BLACK = 'black' // a piece's side
const WHITE_CELL = '#f5f5f5' // a cell's color - a smokey white
const GREEN_CELL = '#31ab36' // a cell's color - a kind of matte green, a guess.
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] // For column names
let SIZE = -1 // This is used a lot - it is the size of the cells : It is set by chess.html's call to setTheSizeForTheBoard()

function setTheSizeForTheBoard (theBoardSize) {
  // This is set in chess.html to 800 - TODO: Make it dynamic
  //
  // This will be the size for the cells
  SIZE = theBoardSize / 8
}

function getCellId_fromColumnAndRow (c, r) {
  let flipflop = 8 - (r + 1)  // reverse the order : make 'a' column be at the 'bottom' of the chess board
  let id = LETTERS[c] + flipflop // now, the id will be something like 'a6'
  return id
}
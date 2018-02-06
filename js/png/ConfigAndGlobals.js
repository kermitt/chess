const WHITE = 'white' // a piece's side
const BLACK = 'black' // a piece's side
const WHITE_CELL = '#f5f5f5' // a cell's color - a smokey white
const GREEN_CELL = '#31ab36' // a cell's color - a kind of matte green, a guess.
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] // For column names
let SIZE = -1 // This is used a lot - it is the size of the cells : It is set by chess.html's call to setTheSizeForTheBoard()
const INFLUENCED = 'influenced'
const ATTACKABLE = 'attackable'
const SUPPORTED = 'supported'
const ENPASSANT = 'enpassant'

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
function isPawn (pieceName) {
  if (pieceName.includes('pawn')) {
    return true
  }
  return false
}
function getPieceId_onCell (column, row) {
  if (isOnTheBoard(column, row)) {
    let cid = getCellId_fromColumnAndRow(column, row)
    let pid = board.cells[cid].getPieceId()
    return pid
  } else {
    return undefined
  }
}

function isOnTheBoard (column, row) {
  // often need to know if a possible column/row combo is a legal one of not
  let isOk = column >= 0 && row >= 0 && column <= 7 && row <= 7
  return isOk
}

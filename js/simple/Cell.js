class Cell {
  constructor (col, row, color, size, id, offset) {
    this.column = col
    this.row = row
    this.color = color
    this.x = col * size
    this.y = row * size
    this.px = this.x + (size / 2) // used to position any piece that resides on top of this cell
    this.py = this.y + (size / 2) // used to position any piece that resides on top of this cell
    this.pieceId = undefined
    this.id = id
    this.isInfluenced = false
    this.isAttacked = false
    this.isSupported = false
    this.isEnpassant = false
  }
  setPiece (piece) {
//    this.removePiece()
    this.pieceId = piece.id
  }
  removePiece () {
    this.pieceId = undefined
  }
  getPieceId () {
    return this.pieceId
  }
}

try {
  module.exports = {
    Cell: Cell
  }
} catch (ignore) {
  // Export is for testing purposes...
  // If this 'error' occures, then that means that the context is a browser.
  // QED : Not an error
}

class Cell {
  constructor (col, row, color, size) {
    this.col = col
    this.row = row
    this.color = color
    this.x = col * size
    this.y = row * size
    this.cx = this.x + (size / 2)
    this.cy = this.y + (size / 2)
    this.pieceKey = undefined
  }
  addPiece (pieceKey) {
    this.pieceKey = pieceKey
  }
  removePiece (pieceKey) {
    this.pieceKey = undefined
  }
}

class Board {
  constructor (size) {
    this.board = []
    this.setup(size)
  }

  setup (size) {
    let j = 0
    for (let c = 0; c < 8; c++) {
      let rows = []
      for (let r = 0; r < 8; r++) {
        let color = j % 2 == 0 ? WHITE_CELL : GREEN_CELL
        rows.push(new Cell(c, r, color, size))
        j++
      }
      this.board.push(rows)
      j++ // stagger the j for proper cell coloring
    }
  }
  setPieceOnCell (pieceKey, col, row) {
    this.board[col][row].setPieceOnCell(pieceKey)
  }
}

try {
  module.exports = {
    Board: Board,
    Cell: Cell
  }
} catch (ignore) {
  // Export for testing purposes, but not for Web stuff.
}

class Cell {
  constructor (col, row, color, size, id, offset) {
    this.col = col
    this.row = row
    this.color = color
    this.x = col * size
    this.y = row * size
    this.px = this.x + (size / 2) // used to position any piece that resides on top of this cell
    this.py = this.y + (size / 2) // used to position any piece that resides on top of this cell
    this.pieceId = undefined
    this.id = id
    this.isInfluenced = true // TODO: Make this dynamic
  }
  addPiece (pieceKey) {
    this.removePiece()
    this.pieceKey = pieceKey
  }
  removePiece () {
    this.pieceKey = undefined
  }
}

class Board {
  constructor () {
    this.board = []

    // const tmp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const OFFSET_FOR_POSITIONING_THE_PIECES_CORRECTLY = SIZE / 2
    let j = 0
    for (let c = 0; c < 8; c++) {
      let rows = []
      for (let r = 0; r < 8; r++) {
        let color = j % 2 == 0 ? WHITE_CELL : GREEN_CELL
        // let flipflop = 8 - (r + 1)  // reverse the order : make 'a' column be at the 'bottom' of the chess board
        // let id = tmp[c] + (flipflop) // now, the id will be something like 'a6'

        let id = getCellId_fromColumnAndRow(c, r)

        rows.push(new Cell(c, r, color, SIZE, id))
        j++
      }
      this.board.push(rows)
      j++ // stagger the j for proper cell coloring
    }
  }

  getCell (col, row) {
    let cell = this.board[col][row]
    return cell
  }

  setPieceOnCell (pieceKey, col, row) {
    this.board[col][row].addPiece(pieceKey)
  }

  zeroOutInfluences () {
    console.log('TODO zeroOutInfluences')
  }

  findClosestLegalCell (mouseX, mouseY) {
    let rowIndex = -1
    let columnIndex = -1
    let current = 999999
    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.isInfluenced == true) {
          let x = cell.px - mouseX
          let y = cell.py - mouseY
          let distance = Math.sqrt((x * x) + (y * y))
          if (distance < current) {
            current = distance
            rowIndex = i
            columnIndex = j
          }
        }
      })
    })
    return this.board[rowIndex][columnIndex]
  }
}

try {
  module.exports = {
    Board: Board,
    Cell: Cell
  }
} catch (ignore) {
  // Export is for testing purposes...
  // If this 'error' occures, then that means that the context is a browser.
  // QED : Not an error
}

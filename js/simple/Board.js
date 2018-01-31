class Board {
  constructor () {
    this.moveCount = 0
    this.cells = {}
    const OFFSET_FOR_POSITIONING_THE_PIECES_CORRECTLY = SIZE / 2
    let j = 0
    for (let c = 0; c < 8; c++) {
      let rows = []
      for (let r = 0; r < 8; r++) {
        let color = j % 2 == 0 ? WHITE_CELL : GREEN_CELL
        let id = getCellId_fromColumnAndRow(c, r)
        this.cells[id] = new Cell(c, r, color, SIZE, id)
        j++
      }
      j++ // stagger the j for proper cell coloring
    }
  }

  setPieceOnCell (pieceKey, col, row) {
    this.board[col][row].addPiece(pieceKey)
  }

  zeroOutInfluences () {
    console.log('TODO zeroOutInfluences')
  }

  findClosestLegalCell (mouseX, mouseY) {
    let selectedId
    let current = 999999
    for (let id in this.cells) {
      let cell = this.cells[id]
      let x = cell.px - mouseX
      let y = cell.py - mouseY
      let distance = Math.sqrt((x * x) + (y * y))
      if (distance < current) {
        current = distance
        selectedId = id
      }
    }
    if (selectedId != undefined) {
      return this.cells[selectedId]
    }
  }
}

try {
  module.exports = {
    Board: Board
  }
} catch (ignore) {
  // Export is for testing purposes...
  // If this 'error' occures, then that means that the context is a browser.
  // QED : Not an error
}


/* This is the entry point */

/* Globals */
let w = 800
let h = 800
let size = w / 8
let id2cell = {}
let board = new Board()
let pieces = new Pieces()
let moves = new Moves()

/* Begin! */
function main () {
  board.setEveryCellLocations(size)

  board.board.forEach(row => {
    row.forEach(cell => {
      addCell(cell)
    })
  })
  for (let key in pieces.pieces) {
    let p = pieces.pieces[key]
    let x = board.getXLocation(p.cellId)
    let y = board.getYLocation(p.cellId)
    p.setXLocation(x)
    p.setYLocation(y)
    addPieceIntoDom(p)
  }
}
main()

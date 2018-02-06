
function getInfluences (piece) {
  let n = piece.getTravel()
  let r = piece.row
  let c = piece.column
  let map = {}

  piece.moves.forEach((possible, i) => {
    let col = c
    let row = r
    let notBlocked = true
    for (let j = 0; j < n; j++) {
      col += possible[0]
      row += possible[1]
      if (isOnTheBoard(col, row) && notBlocked) {
        let cid = getCellId_fromColumnAndRow(col, row)
        let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
        if (pid == undefined) {
          board.cells[cid].isInfluenced = true
          map['#' + cid] = INFLUENCED
        } else {
          if (pieces[pid].color == piece.color) {
            notBlocked = false
            board.cells[cid].isSupported = true
            map['#' + cid] = SUPPORTED
          } else {
            notBlocked = false
            board.cells[cid].isAttacked = true
            map['#' + cid] = ATTACKABLE
          }
        }
      }
    }
  })
  return map
}

function placePiece_snapTo (piece, mouseX, mouseY) {
  let cell = board.findClosestLegalCell(mouseX, mouseY)
  let origCellId = getCellId_fromColumnAndRow(piece.column, piece.row)
  let origCell = board.cells[origCellId]

  if (cell.isAttacked || cell.isInfluenced) {
    piece.x = cell.px
    piece.y = cell.py
    piece.row = cell.row
    piece.column = cell.column
    origCell.removePiece()
    if (cell.isAttacked) {
      killPiece_and_place_into_the_deadpieces_bin(cell)
    }
    cell.setPiece(piece)
    piece.moveCount++
    board.moveCount++
  } else {
    let origCellId = getCellId_fromColumnAndRow(piece.column, piece.row)
    piece.x = origCell.px
    piece.y = origCell.py
  }
/*
  d3.select('#' + piece.id)
    .data([{'x': piece.x, 'y': piece.y}])
    .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')

  zerooutInfluence()
  */
}

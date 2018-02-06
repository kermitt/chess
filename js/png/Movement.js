
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

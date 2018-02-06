
function getPossibleMoves (key) {
//  console.log(key)
  if (isPawn(pieces[key].name)) {
  } else {
    return doNormalMovement(pieces[key])
  }
}

function doNormalMovement (piece) {
  let n = piece.getTravel()
  let r = piece.row
  let c = piece.column
  let results = {}
  piece.moves.forEach((possible, i) => {
    let col = c
    let row = r
    let notBlocked = true
    for (let j = 0; j < n; j++) {
      col += possible[0]
      row += possible[1]

      if (isOnTheBoard(col, row) && notBlocked) {
        let cid = getCellId_fromColumnAndRow(col, row)
        let pid = board.cells[cid].getPieceId()  // Does this cell have a piece already on it?
        if (pid == undefined) {
          results[cid] = INFLUENCED
        } else {
          if (pieces[pid].color == piece.color) {
            results[cid] = SUPPORTED
          } else {
            results[cid] = ATTACKED
          }
        }
      }
    }
  })
  return results
}

function getPossiblePawnMoves (moves, column, row, color, adjustRow) {
  let LoH = {}
  let n = moves == 0 ? 2 : 1
  for (let i = 0; i < n; i++) {
    row += adjustRow
    let cid = getCellId_fromColumnAndRow(column, row)
    let pid = board.cells[cid].getPieceId()// Does this cell have a piece already on it?
    if (pid == undefined) {
      LoH['move_' + i ] = [column, row]
    }
  }
  return LoH
}

function getPossibleAttacks (c, r, color, adjustRow) {
  let HoL = {}
  for (let i = 0; i < 2; i++) {
    let adjustColumn = i == 0 ? -1 : 1
    let col = c + adjustColumn
    let row = r + adjustRow

    if (isOnTheBoard(col, row)) {
      let cid = getCellId_fromColumnAndRow(col, row)
      let pid = board.cells[cid].getPieceId()
      if (pid != undefined) {
        if (pieces[pid].color != color) {
          HoL['attack_' + i] = [col, row]
        } else {
          HoL['support_' + i] = [col, row]
        }
      }
    }
  }
  return HoL
}

function getPossibleEnpassantAttacks (c, r, color, adjustRow, correctRowToDoEnpassant) {
  let kill_and_land = []

  if (r == correctRowToDoEnpassant) {
    for (let i = 0; i < 2; i++) {
      let adjustColumn = i == 0 ? -1 : 1
      let col = c + adjustColumn
      let row = r
//      console.log(' col ' + col + ' row ' + row)
      if (isOnTheBoard(col, row)) {
        let cell_to_kill = getCellId_fromColumnAndRow(col, row)
        let pid = board.cells[cell_to_kill].getPieceId()

        if (pid != undefined) {
          let p = pieces[pid]
          if (p.name.includes('pawn') && p.color != color && p.moveCount == 1) {
            // It is an enemy pawn next to us AND its only move so far has been to 'jump 2' spaces
            // Now, is the cell 'behind' it also empty?
            row += adjustRow
            let cell_to_land_on = getCellId_fromColumnAndRow(col, row)
            let pid2 = board.cells[cell_to_land_on].getPieceId()
            if (pid2 == undefined) {
              // It is empty...
              kill_and_land.push([cell_to_kill, cell_to_land_on ])
            }
          }
        }
      }
    }
  }
  return kill_and_land
}

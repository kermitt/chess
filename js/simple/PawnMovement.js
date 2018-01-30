
function getPossiblePawnMoves_white (column, row, moveCount) {
  let movements = {}
  if (isOnTheBoard(column, row - 1)) {
    let cid = getCellId_fromColumnAndRow(column, row - 1)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
      movements['move1'] = [column, row - 1]
    }
  }

    // forward 2
  if (isOnTheBoard(column, row - 2) && moveCount == 0) {
    let cid = getCellId_fromColumnAndRow(column, row - 2)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
      movements[PAWN_JUMPED_2_SPACES] = [column, row - 2]
    }
  }
  return movements
}

function getPossiblePawnAttackMoves_white (column, row, color) {
  let attacks = {}

  let candidateRow = row - 1
  let candidateCol1 = column + 1
  let candidateCol2 = column - 1

    // left side
  if (isOnTheBoard(column + 1, row - 1)) {
    let cid = getCellId_fromColumnAndRow(column + 1, row - 1)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) {
        attacks['left_attack'] = [column + 1, row - 1]
      } else {
        attacks['left_support'] = [column + 1, row - 1]
      }
    }
  }
        // right side
  if (isOnTheBoard(candidateCol1, row - 1)) {
    let cid = getCellId_fromColumnAndRow(column + 1, row - 1)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) {
        attacks['right_attack'] = [column - 1, row - 1]
      } else {
        attacks['right_support'] = [column - 1, row - 1]
      }
    }
  }

      // en passant ( left )
  if (this.row == 4) { // Is this pawn in the correct row to launch an en passant attack?
    let cid = getCellId_fromColumnAndRow(column + 1, row)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) { // Is an enemy?
        if (pieces[pid].name.includes('pawn')) { // Is a pawn?
          let cid2 = getCellId_fromColumnAndRow(column + 1, row - 1) // cell is vacant?
          if (cid2 == undefined) { // Yes, the cell is vacant
              // Empty cell! It is possible to move here
            if (pieces[pid].lastMoveWas2Spaces) { // Was the last move that the target pawn made a two move thing?
              attacks['left_attack_enpassant'] = [column + 1, row - 1]
            }
          }
        }
      }
    }
  }

      // en passant ( right )
  if (this.row == 4) { // Is this pawn in the correct row to launch an en passant attack?
    let cid = getCellId_fromColumnAndRow(this.column - 1, this.row)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != this.color) { // Is an enemy?
        if (pieces[pid].name.includes('pawn')) { // Is a pawn?
          let cid2 = getCellId_fromColumnAndRow(this.column - 1, this.row - 1) // cell is vacant?
          if (cid2 == undefined) { // Yes, the cell is vacant
              // Empty cell! It is possible to move here
            if (pieces[pid].lastMoveWas2Spaces) { // Was the last move that the target pawn made a two move thing?
              attacks['right_attack_enpassant'] = [this.column - 1, this.row - 1]
            }
          }
        }
      }
    }
  }
  return attacks
}

function getPossiblePawnMoves_black (column, row, moveCount) {
  let movements = {}
    // forward 1
  if (isOnTheBoard(column, row + 1)) {
    let cid = getCellId_fromColumnAndRow(column, row + 1)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
      movements['move1'] = [column, row + 1]
    }
  }

    // forward 2
  if (isOnTheBoard(column, row + 2) && moveCount == 0) {
    let cid = getCellId_fromColumnAndRow(column, row + 2)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
      movements[PAWN_JUMPED_2_SPACES] = [column, row + 2]
    }
  }

  return movements
}

function getPossiblePawnAttackMoves_black (column, row, color) {
  let attacks = {}

  let candidateRow = row + 1
  let candidateCol1 = column - 1
  let candidateCol2 = column + 1

    // left side
  if (isOnTheBoard(candidateCol1, row + 1)) {
    let cid = getCellId_fromColumnAndRow(column - 1, row + 1)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) {
        attacks['left_attack'] = [column - 1, row + 1]
      } else {
        attacks['left_support'] = [column - 1, row + 1]
      }
    }
  }
        // right side
  if (isOnTheBoard(candidateCol1, row + 1)) {
    let cid = getCellId_fromColumnAndRow(candidateCol1, row + 1)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) {
        attacks['right_attack'] = [column + 1, row + 1]
      } else {
        attacks['right_support'] = [column + 1, row + 1]
      }
    }
  }

      // en passant ( left )
  if (this.row == 4) { // Is this pawn in the correct row to launch an en passant attack?
    let cid = getCellId_fromColumnAndRow(column - 1, row)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) { // Is an enemy?
        if (pieces[pid].name.includes('pawn')) { // Is a pawn?
          let cid2 = getCellId_fromColumnAndRow(column - 1, row + 1) // cell is vacant?
          if (cid2 == undefined) { // Yes, the cell is vacant
              // Empty cell! It is possible to move here
            if (pieces[pid].lastMoveWas2Spaces) { // Was the last move that the target pawn made a two move thing?
              attacks['left_attack_enpassant'] = [column - 1, row + 1]
            }
          }
        }
      }
    }
  }

      // en passant ( right )
  if (row == 4) { // Is this pawn in the correct row to launch an en passant attack?
    let cid = getCellId_fromColumnAndRow(column + 1, row)
    let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
    if (pid == undefined) {
        // do nothing
    } else {
      if (pieces[pid].color != color) { // Is an enemy?
        if (pieces[pid].name.includes('pawn')) { // Is a pawn?
          let cid2 = getCellId_fromColumnAndRow(column + 1, row + 1) // cell is vacant?
          if (cid2 == undefined) { // Yes, the cell is vacant
              // Empty cell! It is possible to move here
            if (pieces[pid].lastMoveWas2Spaces) { // Was the last move that the target pawn made a two move thing?
              attacks['right_attack_enpassant'] = [column + 1, row + 1]
            }
          }
        }
      }
    }
  }
  return attacks
}

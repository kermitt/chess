
class DisplayLogic {
  static unroll (o) {
    console.log(JSON.stringify(o, null, 6))
  }

  static killPieceOnThisCell (cellId) {
    for (let key in pieces.pieces) {
      if (cellId === pieces.pieces[key].cellId) {
        log('KILL cellId ' + JSON.stringify(pieces.pieces[key], null, 6))
        d3.select('#' + pieces.pieces[key].key).remove()

        let domId = 'killed' + pieces.pieces[key].color // 'WHITE' or 'BLACK'

        let current = document.getElementById(domId).innerHTML
        let more = pieces.pieces[key].unicode + '<br>' + current
        document.getElementById(domId).innerHTML = more

        delete pieces.pieces[key]
      }
    }
  }

  static findPossibleMoves (p) {
    board.zeroOutInfluences()

    let pieces_whichCell_whichColor = {}
    for (let key in pieces.pieces) {
      let blackOrWhite = pieces.pieces[key].color
      let cId = pieces.pieces[key].cellId
      pieces_whichCell_whichColor[cId] = blackOrWhite
    }
    let col_row = p.getColRow_currentCell()
    let LoL_influences = moves.getPossibleMoves(p.key, p.moveCount)
    LoL_influences.forEach((tuple) => {
      let columnMovement = tuple[0]
      let rowMovement = tuple[1]
      let possibleMoveCount = tuple[2]
//      this.influence(p.color, col_row[0], col_row[1], tuple[0], tuple[1], pieces_whichCell_whichColor)
      this.influence(p.color, col_row[0], col_row[1], columnMovement, rowMovement, pieces_whichCell_whichColor, possibleMoveCount, 0)
    })
    LoL_influences.forEach(potential_col_row => {
      let col_row = moves.getColumnRow_viaRelativeLookup(p.cellId, potential_col_row)
      try {
        if (col_row != undefined) {
          let c = col_row[0]
          let r = col_row[1]
        }
      } catch (ignore) {
      }
    })
  }

  static influence (pieceColor, col, row, vectorY, vectorX, pieces_whichCell_whichColor, possibleMoveCount, currentMoveCount) {
    currentMoveCount++
    if (currentMoveCount <= possibleMoveCount) {
      let potential = board.board[col][row]
      if (potential != undefined) {
        let c = col + vectorY
        let r = row + vectorX
        if (c < 8 && c >= 0 && r < 8 && r >= 0) {
          let cellId = 'cr_' + c + '_' + r
          let hit = pieces_whichCell_whichColor.hasOwnProperty(cellId)
          if (hit === true) {
            let otherPieceColor = pieces_whichCell_whichColor[cellId]
            if (pieceColor != otherPieceColor) {
              board.setIsAttacked(c, r)
              board.setInfluenced(c, r)
            } else {
              board.setIsSupported(c, r)
            }
          } else {
            board.setInfluenced(c, r)
          }
          if (!pieces_whichCell_whichColor.hasOwnProperty(cellId)) {
            this.influence(pieceColor, c, r, vectorY, vectorX, pieces_whichCell_whichColor, possibleMoveCount, currentMoveCount)
          }
        }
      }
    }
  }
}

/// /
try {
  module.exports = {
    DisplayLogic: DisplayLogic
  }
} catch (ignore) {
  // Export for testing purposes
}

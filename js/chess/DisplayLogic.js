
class DisplayLogic {
  static unroll (o) {
    console.log(JSON.stringify(o, null, 6))
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
      this.influence(p.color, col_row[0], col_row[1], tuple[0], tuple[1], pieces_whichCell_whichColor)
    })
    LoL_influences.forEach(potential_col_row => {
      let col_row = moves.getColumnRow_viaRelativeLookup(p.cellId, potential_col_row)
      try {
        if (col_row != undefined) {
          let c = col_row[0]
          let r = col_row[1]
          board.setInfluenced(c, r)
        }
      } catch (ignore) {
      }
    })
  }

  static influence (pieceColor, col, row, vectorY, vectorX, pieces_whichCell_whichColor) {
    try {
      let potential = board.board[col][row]
      if (potential != undefined) {
        let c = col + vectorY
        let r = row + vectorX

        if (c < 8 && c >= 0 && r < 8 && r >= 0) {
          let cellId = 'cr_' + c + '_' + r

        //  log(JSON.stringify(potential, null, 6))

          let hit = pieces_whichCell_whichColor.hasOwnProperty(cellId)
          if (hit === true) {
            let otherPieceColor = pieces_whichCell_whichColor[cellId]

            if (pieceColor != otherPieceColor) {
              log('ATTACK ' + c + ' r ' + r + '  color ' + pieceColor + '    potential ' + potential.color + '   hit ' + hit + '    ' + otherPieceColor)

              board.setIsAttacked(c, r)
            } else {
              log('SUPPORT ' + c + ' r ' + r + '  color ' + pieceColor + '    potential ' + potential.color + '   hit ' + hit + '    ' + otherPieceColor)

              board.setIsSupported(c, r)
            }
          } else {
            log('INFLUENCE ' + c + ' r ' + r + '  color ' + pieceColor + '    potential ' + potential.color)

            board.setInfluenced(c, r)
          }

          if (!pieces_whichCell_whichColor.hasOwnProperty(cellId)) {
            // let cellColor = pieces_whichCell_whichColor[cellId]

          //  log('CONTINUE ' + pieceColor + '    cellId ' + cellId)
            this.influence(pieceColor, c, r, vectorY, vectorX, pieces_whichCell_whichColor)
          } else {
          //  log('STOP ' + pieceColor + '    >' + cellColor + '< : cellId ' + cellId + ' col ' + col + ', ' + row + '  ---> ' + vectorX + ', ' + vectorY + ' checking for ' + cellId)
          }
        } else {
          // log('IMPOSSIBLE c ' + c + ' r ' + r)
        }
      } else {
        // log('IMPOSSIBLE col ' + col + ' row ' + row)
      }
    } catch (boom) {
      console.log('Boom: ' + boom)
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

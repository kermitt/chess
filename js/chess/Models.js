// + --------------------------------------------------------------------------+
/*
cellId = cr_#_# where the 1st is the column and the second is the row
*/
class Piece {
  constructor (unicode, cellId) {
    this.unicode = unicode // display image
    this.cellId = cellId // this is the cell id that a piece is on top of.
    this.moveCount = 0
    this.color = ''
    this.type = ''
    this.num = ''
    this.key = ''
  }
  finishSetup (key) {
    let ary = key.split('_')
    this.color = ary[0]
    this.type = ary[1]
    this.num = ary[2]
    this.key = key
  }
  setXLocation (x) {
    this.x = x
  }
  setYLocation (y) {
    this.y = y
  }
  getColRow_currentCell () {
    let ary = this.cellId.split('_')
    let ignore = ary[0]
    let column = parseInt(ary[1])
    let row = parseInt(ary[2])
    return [column, row]
  }
}
// + --------------------------------------------------------------------------+
class Pieces {
  constructor () {
    this.pieces = {}
    this.pieces['WHITE_KING_1'] = new Piece('\u2654', 'cr_4_7')
    this.pieces['WHITE_QUEEN_1'] = new Piece('\u2655', 'cr_3_7')
    this.pieces['WHITE_ROOK_1'] = new Piece('\u2656', 'cr_0_7')
    this.pieces['WHITE_ROOK_2'] = new Piece('\u2656', 'cr_7_7') //  7_7
    this.pieces['WHITE_BISHOP_1'] = new Piece('\u2657', 'cr_2_7')
    this.pieces['WHITE_BISHOP_2'] = new Piece('\u2657', 'cr_5_7')
    this.pieces['WHITE_KNIGHT_1'] = new Piece('\u2658', 'cr_1_7')
    this.pieces['WHITE_KNIGHT_2'] = new Piece('\u2658', 'cr_6_7')
    this.pieces['WHITE_PAWN_1'] = new Piece('\u2659', 'cr_0_6')
    this.pieces['WHITE_PAWN_2'] = new Piece('\u2659', 'cr_1_6')
    this.pieces['WHITE_PAWN_3'] = new Piece('\u2659', 'cr_2_6')
    this.pieces['WHITE_PAWN_4'] = new Piece('\u2659', 'cr_3_6')
    this.pieces['WHITE_PAWN_5'] = new Piece('\u2659', 'cr_4_6')
    this.pieces['WHITE_PAWN_6'] = new Piece('\u2659', 'cr_5_6')
    this.pieces['WHITE_PAWN_7'] = new Piece('\u2659', 'cr_6_6')
    this.pieces['WHITE_PAWN_8'] = new Piece('\u2659', 'cr_7_6')
    this.pieces['BLACK_KING_1'] = new Piece('\u265A', 'cr_4_0')
    this.pieces['BLACK_QUEEN_1'] = new Piece('\u265B', 'cr_3_0')
    this.pieces['BLACK_ROOK_1'] = new Piece('\u265C', 'cr_0_0')
    this.pieces['BLACK_ROOK_2'] = new Piece('\u265C', 'cr_7_0')
    this.pieces['BLACK_BISHOP_1'] = new Piece('\u265D', 'cr_2_0')
    this.pieces['BLACK_BISHOP_2'] = new Piece('\u265D', 'cr_5_0')
    this.pieces['BLACK_KNIGHT_1'] = new Piece('\u265E', 'cr_1_0')  // cr_1_0
    this.pieces['BLACK_KNIGHT_2'] = new Piece('\u265E', 'cr_6_0')
    this.pieces['BLACK_PAWN_1'] = new Piece('\u265F', 'cr_0_1')
    this.pieces['BLACK_PAWN_2'] = new Piece('\u265F', 'cr_1_1')
    this.pieces['BLACK_PAWN_3'] = new Piece('\u265F', 'cr_2_1')
    this.pieces['BLACK_PAWN_4'] = new Piece('\u265F', 'cr_3_1')
    this.pieces['BLACK_PAWN_5'] = new Piece('\u265F', 'cr_4_1')
    this.pieces['BLACK_PAWN_6'] = new Piece('\u265F', 'cr_5_1')
    this.pieces['BLACK_PAWN_7'] = new Piece('\u265F', 'cr_6_1')
    this.pieces['BLACK_PAWN_8'] = new Piece('\u265F', 'cr_7_1')

    for (let key in this.pieces) {
      this.pieces[key].finishSetup(key)
    }
  }
}
// + --------------------------------------------------------------------------+
class Board {
  constructor () {
    this.board = []   // LoL
    this.id2cell = {} // HoL
    this.setup()
  }
  findClosestLegalCell (currentX, currentY, horizon) {
    let closestCellId = ''
    let current = 999999
    this.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isInfluenced == true) {
          let x = cell.cx - currentX
          let y = cell.cy - currentY
          let distance = Math.sqrt((x * x) + (y * y))
//          console.log(cell.id + '   ' + cell.cx + '    ' + cell.cy + '   d ' + distance)
          if (distance < current) {
            current = distance
            closestCellId = cell.id
          }
        }
      })
    })

    if (current < horizon) {
      return closestCellId
    }
    return '' // none found
  }

  getXLocation (key) {
    let ary = this.id2cell[key]

    let col = ary[0]
    let row = ary[1]

    return this.board[col][row].cx
  }
  getYLocation (key) {
    let ary = this.id2cell[key]
    let col = ary[0]
    let row = ary[1]
    return this.board[col][row].cy
  }
  setInfluenced (col, row) {
    // console.log('col: ' + col + ' row ' + row)
    this.board[col][row].isInfluenced = true
  }

  show () {
    console.log(JSON.stringify(this.board, null, 6))
  }
  setup () {
    let i = 0
    let j = 0
    for (let c = 0; c < 8; c++) {
      let rows = []
      for (let r = 0; r < 8; r++) {
        let o = {}
        o.col = c
        o.row = r
        o.id = 'cr_' + c + '_' + r
        o.color = j % 2 == 0 ? '#ffffff' : '#00b200'
        o.i = j
        o.isInfluenced = false
        o.x = 1 // these, x, y, cx and cy will be set later
        o.y = 2// these, x, y, cx and cy will be set later
        o.cx = 3// these, x, y, cx and cy will be set later
        o.cy = 4// these, x, y, cx and cy will be set later
        i++
        j++
        rows.push(o)

        this.id2cell[o.id] = [o.col, o.row]
      }
      this.board.push(rows)
      j++ // stagger the j for proper cell coloring
    }
  }
  setEveryCellLocations (size) {
    this.board.forEach(row => {
      row.forEach(cell => {
        cell.x = cell.col * size
        cell.y = cell.row * size
        cell.cx = cell.x + (size / 2)
        cell.cy = cell.y + (size / 2)
      })
    })
  }
  zeroOutInfluences () {
    this.board.forEach(row => {
      row.forEach(cell => {
        cell.isInfluenced = false
      })
    })
  }
}
// + --------------------------------------------------------------------------+

class Moves {
  show_possible_moves (piece) {
    return this.getPossibleMoves(piece.type)
  }

  getColumnRow_viaRelativeLookup (starting_column_row, endingVector) {
    // cr_3_3
    let ary = starting_column_row.split('_')
    let ignore = ary[0]
    let column = parseInt(ary[1])
    let row = parseInt(ary[2])
    column += parseInt(endingVector[0])
    row += parseInt(endingVector[1])

    if (column < 8 && column >= 0 && row < 8 && row >= 0) {
      return [column, row]
    }
    return undefined
  }

  getID_viaRelativeLookup (starting_column_row, endingVector) {
    // cr_3_3
    let ary = starting_column_row.split('_')
    let ignore = ary[0]
    let column = parseInt(ary[1])
    let row = parseInt(ary[2])
    column += parseInt(endingVector[0])
    row += parseInt(endingVector[1])
    if (column <= 8 && column >= 0 && row <= 8 && row >= 0) {
      result = 'cr_' + column + '_' + row
    }
    return result
  }
  getPossibleMoves (key, moveCount) {
    // console.log('getPossibleMoves: ' + key + ' mc ' + moveCount)

    // console.log('|' + key + '|')
    let ary = key.split('_')
    let color = ary[0]
    let type = ary[1]
    let num = ary[2]

    // key = relative cell id from the current id
    // e.g., on cell(30) then cell(31) would be one more towards
    // the black side from the white side. This would be recorded here
    // as moves[1] = 1
    //
    // A value of '1' = can only move once.
    // A value of '7' = can move up to 7 times
    let moves = []
    if (type === 'ROOK') {
      moves.push([0, 1])
      moves.push([0, -1])
      moves.push([1, 0])
      moves.push([-1, 0])
    } else if (type === 'KNIGHT') {
      moves.push([-1, -2])
      moves.push([1, -2])
      moves.push([2, -1])
      moves.push([2, 1])

      moves.push([1, 2])
      moves.push([-1, 2])

      moves.push([-2, 1])
      moves.push([-2, -1])
    } else if (type === 'BISHOP') {
      moves.push([-1, -1])
      moves.push([1, -1])
      moves.push([1, 1])
      moves.push([-1, 1])
    } else if (type === 'QUEEN') {
      moves.push([-1, -1])
      moves.push([1, -1])
      moves.push([1, 1])
      moves.push([-1, 1])
      moves.push([0, 1])
      moves.push([0, -1])
      moves.push([1, 0])
      moves.push([-1, 0])
    } else if (type === 'KING') {
      moves.push([-1, -1])
      moves.push([1, -1])
      moves.push([1, 1])
      moves.push([-1, 1])
      moves.push([0, 1])
      moves.push([0, -1])
      moves.push([1, 0])
      moves.push([-1, 0])
    } else if (type === 'PAWN' && color === 'BLACK' && moveCount === 0) {
      moves.push([0, 1])
    //  moves.push([0, 2])
    } else if (type === 'PAWN' && color === 'WHITE' && moveCount === 0) {
      moves.push([0, -1])
    //  moves.push([0, -2])
    } else if (type === 'PAWN' && color === 'BLACK') {
      moves.push([0, 1])
    } else if (type === 'PAWN' && color === 'WHITE') {
      moves.push([0, -1])
    }
    /*
    console.log('.........')
    for (let key in moves) {
      console.log(key + '    ' + moves[key])
    }
    console.log('type: |' + type)
    console.log('col: |' + color)

    console.log('>>>>>>>>>>')
    */
    return moves
  }
}
// + --------------------------------------------------------------------------+

try {
  module.exports = {
    Pieces: Pieces,
    Board: Board,
    Moves: Moves
  }
} catch (ignore) {
  // Export for testing purposes
}

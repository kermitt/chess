const WHITE = 'WHITE'
const BLACK = 'BLACK'
const WHITE_CELL = '#ffffff'
const GREEN_CELL = '#00b200'
const NORTH = [0, -1]
const EAST = [1, 0]
const SOUTH = [0, 1]
const WEST = [-1, 0]
const NORTHEAST = [1, -1]
const SOUTHEAST = [1, 1]
const SOUTHWEST = [-1, 1]

const NORTHWEST = [-1, -1]

class Cell {
  constructor (col, row, color, size) {
    this.id = col + '_' + row
    this.col = col
    this.row = row
    this.color = color
    this.x = col * size
    this.y = row * size
    this.cx = this.x + (size / 2)
    this.cy = this.y + (size / 2)
    this.pieceKey = undefined
  }
  addPiece (pieceKey) {
    this.pieceKey = pieceKey
  }
  removePiece (pieceKey) {
    this.pieceKey = undefined
  }
 }

class Board {
  constructor (size) {
    this.board = []
    this.setup(size)
  }

  setup (size) {
    let j = 0
    for (let c = 0; c < 8; c++) {
      let rows = []
      for (let r = 0; r < 8; r++) {
        let color = j % 2 == 0 ? WHITE_CELL : GREEN_CELL
        rows.push(new Cell(c, r, color, size))
      //  log('Board setup ' + c + '  r ' + r)
        j++
      }
      this.board.push(rows)
      j++ // stagger the j for proper cell coloring
    }
  }
  setPieceOnCell (pieceKey, col, row) {
    this.board[col][row].setPieceOnCell(pieceKey)
  }
}

class WhitePawn {
  constructor (id, col, row) {
    this.points = 1
    this.unicode = '\u265F'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 1
    this.color = WHITE
  }

  getAttacks () {
    return [NORTHEAST, NORTHWEST]
  }
  getMoves () {
    if (this.moves === 0) {
        // pawn can jump 2 at first
      return [NORTH, [0, -2]]
    } else {
        //
      return [NORTH]
    }
  }
}

class WhiteRook {
  constructor (id, col, row) {
    this.points = 5
    this.unicode = '\u265C'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 7
    this.color = WHITE
  }

  getMoves () {
    return [NORTH, EAST, SOUTH, WEST]
  }

  getAttacks () {
    return [NORTH, EAST, SOUTH, WEST]
  }
}

class WhiteKnight {
  constructor (id, col, row) {
    this.points = 3
    this.unicode = '\u265E'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 1
    this.color = WHITE
  }

  getMoves () {
    return [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1]
  }
  getAttacks () {
    return [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1]
  }
}

class WhiteBishop {
  constructor (id, col, row) {
    this.points = 3
    this.unicode = '\u265B'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 7
    this.color = WHITE
  }

  getMoves () {
    return [NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }

  getAttacks () {
    return [NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }
}
class WhiteQueen {
  constructor (id, col, row) {
    this.points = 9
    this.unicode = '\u265B'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 7
    this.color = WHITE
  }

  getMoves () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }

  getAttacks () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }
}

class WhiteKing {
  constructor (id, col, row) {
    this.points = 0
    this.unicode = '\u265A'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 1
    this.color = WHITE
  }

  getMoves () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }

  getAttacks () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }
}

/// ////////

class BlackPawn {
  constructor (id, col, row) {
    this.points = 1
    this.unicode = '\u265F'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 1
    this.color = BLACK
  }

  getAttacks () {
    return [SOUTHEAST, SOUTHWEST]
  }
  getMoves () {
    if (this.moves === 0) {
        // pawn can jump 2 at first
      return [SOUTH, [0, 2]]
    } else {
        //
      return [SOUTH]
    }
  }
}

class BlackRook {
  constructor (id, col, row) {
    this.points = 5
    this.unicode = '\u265C'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 7
    this.color = BLACK
  }

  getMoves () {
    return [NORTH, EAST, SOUTH, WEST]
  }

  getAttacks () {
    return [NORTH, EAST, SOUTH, WEST]
  }
}

class BlackKnight {
  constructor (id, col, row) {
    this.points = 3
    this.unicode = '\u265E'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 1
    this.color = BLACK
  }

  getMoves () {
    return [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1]
  }
  getAttacks () {
    return [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1]
  }
}

class BlackBishop {
  constructor (id, col, row) {
    this.points = 3
    this.unicode = '\u265B'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 7
    this.color = BLACK
  }

  getMoves () {
    return [NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }

  getAttacks () {
    return [NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }
}
class BlackQueen {
  constructor (id, col, row) {
    this.points = 9
    this.unicode = '\u265B'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 7
    this.color = BLACK
  }

  getMoves () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }

  getAttacks () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }
}

class BlackKing {
  constructor (id, col, row) {
    this.points = 0
    this.unicode = '\u265A'
    this.id = id
    this.col = col
    this.row = row
    this.movement = 1
    this.color = BLACK
  }

  getMoves () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }

  getAttacks () {
    return [NORTH, EAST, SOUTH, WEST, NORTHEAST, SOUTHEAST, SOUTHWEST, NORTHWEST]
  }
}

try {
  module.exports = {
    BlackPawn: BlackPawn,
    BlackRook: BlackRook,
    BlackKnight: BlackKnight,
    BlackBishop: BlackBishop,
    BlackQueen: BlackQueen,
    BlackKing: BlackKing,
    Board: Board,
    Cell: Cell
  }
} catch (ignore) {
  // Export for testing purposes, but not for Web stuff.
}

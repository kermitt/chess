const WHITE = 'white' // a piece's side
const BLACK = 'black' // a piece's side
const WHITE_CELL = '#f5f5f5' // a cell's color - a smokey white
const GREEN_CELL = '#31ab36' // a cell's color - a kind of matte green, a guess.

class Piece {
  constructor (unicode, column, row, color, name, possibleSpaces) {
    this.unicode = unicode // diplay
    this.column = column // col
    this.row = row // row
    this.color = color // side
    this.name = name // name
    this.moveCount = 0 // this will be important for Castling and En-passant... and, hopefully, for analytics
    this.possibleSpaces = possibleSpaces// # possible spaces - this will get weird for pawns

    this.moves = [] // This will be an array of arrays...
  }
}

class King extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 7)
    this.moves = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
    ]
  }
}
class Queen extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 7)
    this.moves = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
    ]
  }
}
class Rook extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 7)
    this.moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
    ]
  }
}

class Bishop extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 7)
    this.moves = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
    ]
  }
}
class Knight extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 1)
    this.moves = [
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1]
    ]
  }
}
class PawnWhite extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 1)
    this.moves = [[0, -1]]
  }
}
class PawnBlack extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name, 1)
    this.moves = [[0, 1]]
  }
}
// + --------------------------------------------------------------------------+
let pieces = {}

pieces['wk'] = new King('\u2654', 4, 7, WHITE, 'white_king')
pieces['bk'] = new King('\u265A', 4, 0, BLACK, 'black_king')
    //
pieces['wq'] = new Queen('\u2655', 3, 7, WHITE, 'white_queen')
pieces['bq'] = new Queen('\u265B', 3, 0, BLACK, 'black_queen')
    //
pieces['wr1'] = new Rook('\u2656', 0, 7, WHITE, 'white_rook_queenside')
pieces['wr2'] = new Rook('\u2656', 7, 7, WHITE, 'white_rook_kingside')
pieces['br1'] = new Rook('\u265C', 0, 0, BLACK, 'black_rook_queenside')
pieces['br2'] = new Rook('\u265C', 7, 0, BLACK, 'black_rook_kingside')
    //
pieces['wb1'] = new Bishop('\u2657', 2, 7, WHITE, 'white_bishop_queenside')
pieces['wb2'] = new Bishop('\u2657', 5, 7, WHITE, 'white_bishop_kingside')
pieces['bb1'] = new Bishop('\u265D', 2, 0, BLACK, 'black_bishop_queenside')
pieces['bb2'] = new Bishop('\u265D', 5, 0, BLACK, 'black_bishop_kingside')
    //
// pieces['wk1'] = new Knight('\u2658', 1, 7, WHITE, 'white_knight_queenside')
pieces['wk1'] = new Knight('\u2658', 1, 7, WHITE, 'white_knight_queenside')
pieces['wk2'] = new Knight('\u2658', 6, 7, WHITE, 'white_knight_kingside')
pieces['bk1'] = new Knight('\u265D', 1, 0, BLACK, 'black_knight_queenside')
pieces['bk2'] = new Knight('\u265D', 6, 0, BLACK, 'black_knight_kingside')
    //
pieces['wp1'] = new PawnWhite('\u2659', 0, 6, WHITE, 'white_pawn_1')
pieces['wp2'] = new PawnWhite('\u2659', 1, 6, WHITE, 'white_pawn_2')
pieces['wp3'] = new PawnWhite('\u2659', 2, 6, WHITE, 'white_pawn_3')
pieces['wp4'] = new PawnWhite('\u2659', 3, 6, WHITE, 'white_pawn_4')
pieces['wp5'] = new PawnWhite('\u2659', 4, 6, WHITE, 'white_pawn_5')
pieces['wp6'] = new PawnWhite('\u2659', 5, 6, WHITE, 'white_pawn_6')
pieces['wp7'] = new PawnWhite('\u2659', 6, 6, WHITE, 'white_pawn_7')
pieces['wp8'] = new PawnWhite('\u2659', 7, 6, WHITE, 'white_pawn_8')
    //
pieces['bp1'] = new PawnBlack('\u265F', 0, 1, BLACK, 'black_pawn_1')
pieces['bp2'] = new PawnBlack('\u265F', 1, 1, BLACK, 'black_pawn_2')
pieces['bp3'] = new PawnBlack('\u265F', 2, 1, BLACK, 'black_pawn_3')
pieces['bp4'] = new PawnBlack('\u265F', 3, 1, BLACK, 'black_pawn_4')
pieces['bp5'] = new PawnBlack('\u265F', 4, 1, BLACK, 'black_pawn_5')
pieces['bp6'] = new PawnBlack('\u265F', 5, 1, BLACK, 'black_pawn_6')
pieces['bp7'] = new PawnBlack('\u265F', 6, 1, BLACK, 'black_pawn_7')
pieces['bp8'] = new PawnBlack('\u265F', 7, 1, BLACK, 'black_pawn_8')

class Cell {
  constructor (col, row, color, size, id, offset) {
    this.col = col
    this.row = row
    this.color = color
    this.x = col * size
    this.y = row * size
    // this.px = this.x + offset // used to position any piece that reside on top of this cell
    // this.py = this.y + offset // used to position any piece that reside on top of this cell
    this.px = this.x + (size / 2)
    this.py = this.y + (size / 2)
    this.pieceKey = undefined
    this.id = id
  }
  addPiece (pieceKey) {
    this.removePiece()
    this.pieceKey = pieceKey
  }
  removePiece () {
    this.pieceKey = undefined
  }
}

class Board {
  constructor (size) {
    this.board = []

    const tmp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const OFFSET_FOR_POSITIONING_THE_PIECES_CORRECTLY = size / 2
    let j = 0
    for (let c = 0; c < 8; c++) {
      let rows = []
      for (let r = 0; r < 8; r++) {
        let color = j % 2 == 0 ? WHITE_CELL : GREEN_CELL
        let flipflop = 8 - (r + 1)  // reverse the order : make 'a' column be at the 'bottom' of the chess board
        let id = tmp[c] + (flipflop) // now, the id will be something like 'a6'
        rows.push(new Cell(c, r, color, size, id))
        j++
      }
      this.board.push(rows)
      j++ // stagger the j for proper cell coloring
    }
  }

  getCell (col, row) {
    let cell = this.board[col][row]
    return cell
  }

  setPieceOnCell (pieceKey, col, row) {
    this.board[col][row].addPiece(pieceKey)
  }
}

try {
  module.exports = {
    Board: Board,
    Cell: Cell,
    pieces: pieces
  }
} catch (ignore) {
  // Export is for testing purposes...
  // If this 'error' occures, then that means that the context is a browser.
  // QED : Not an error
}

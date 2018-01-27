
const WHITE = 'white'
const BLACK = 'black'

class Piece {
  constructor (unicode, column, row, color, name) {
    this.unicode = unicode // diplay
    this.column = column // col
    this.row = row // row
    this.color = color // side
    this.name = name // name
    this.moveCount = 0 // this will be important for Castling and En-passant... and, hopefully, for analytics
    this.possibleSpaces = -1 // numberOfPossibleSpacesToMove

    this.moves = [] // This will be an array of arrays...  for example, a Rook will be
    // [[0, 1],[0, -1],[1, 0],[-1, 0]]...  for example, if a Rook were on row4, cell4 then would be possible to move to
    // row4, cell5 by applying the [0,1] move
    //
    // i.e., this.moves is a [ [row, col], [row, col]... etc etc ]
  }
}

class King extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name)
    this.possibleSpaces = 7
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
    super(unicode, column, row, color, name)
    this.possibleSpaces = 7
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
    super(unicode, column, row, color, name)
    this.possibleSpaces = 7
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
    super(unicode, column, row, color, name)
    this.possibleSpaces = 7
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
    super(unicode, column, row, color, name)
    this.possibleSpaces = 7
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
    super(unicode, column, row, color, name)
    this.possibleSpaces = 1
    this.moves = [[0, -1]]
  }
}
class PawnBlack extends Piece {
  constructor (unicode, column, row, color, name) {
    super(unicode, column, row, color, name)
    this.possibleSpaces = 1
    this.moves = [[0, 1]]
  }
}
// + --------------------------------------------------------------------------+
let pieces = {}

pieces['wk'] = new King('\u2654', 4, 7, WHITE, 'white_king')
pieces['bk'] = new King('\u265A', 4, 0, BLACK, 'black_king')
    //
pieces['wq'] = new Queen('\u2656', 3, 7, WHITE, 'white_queen')
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

try {
  module.exports = {
    pieces: pieces
  }
} catch (ignore) {
  // Export for testing purposes...
  // If this 'error' occures, then that means that the context is a browser.
  // QED : Not an error
}

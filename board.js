
alert('hello')

/*
class Piece {
  constructor (unicode, column, row, color, id, name, travel) {
    this.unicode = unicode // diplay
    this.column = column // col
    this.row = row // row
    this.color = color // side
    this.name = name // name
    this.moveCount = 0 // this will be important for Castling and En-passant... and, hopefully, for analytics
    this.travel = travel// # possible spaces - this will get weird for pawns
    this.id = id
  }
  getColRow_currentCell () {
    return {c: this.column, r: this.row, cellId: getCellId_fromColumnAndRow(this.column, this.row), pieceId: this.id}
  }
  getTravel () {
    return this.travel
  }
}

class King extends Piece {
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 1)
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
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 7)
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
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 7)
    this.moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
    ]
  }
}

class Bishop extends Piece {
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 7)
    this.moves = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
    ]
  }
}
class Knight extends Piece {
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 1)
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
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 1)
    this.moves = {}
    this.attacks = {}
    this.kill_and_land = []
  }
  reset () {
    this.moves = {}
    this.attacks = {}
    this.kill_and_land = []
  }

  sussPossiblePawnMoves () {
    let adjustRow = -1 // Go up the board
    this.moves = getPossiblePawnMoves(this.moveCount, this.column, this.row, this.color, adjustRow)
  }
  sussPossiblePawnAttackMoves () {
    let adjustRow = -1 // Go up the board
    this.attacks = getPossibleAttacks(this.column, this.row, this.color, adjustRow)
    this.kill_and_land = getPossibleEnpassantAttacks(this.column, this.row, this.color, adjustRow, 3, this.moveCount)

    // if (this.kill_and_land.length > 0) { console.log('WHITE: ' + JSON.stringify(this.kill_and_land, null, 6)) }
  }
}
class PawnBlack extends Piece {
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 1)
    this.moves = {}
    this.attacks = {}
    this.kill_and_land = []
  }

  reset () {
    this.moves = {}
    this.attacks = {}
    this.kill_and_land = []
  }

  sussPossiblePawnMoves () {
    let adjustRow = 1
    this.moves = getPossiblePawnMoves(this.moveCount, this.column, this.row, this.color, adjustRow)
  }
  sussPossiblePawnAttackMoves () {
    let adjustRow = 1
    this.attacks = getPossibleAttacks(this.column, this.row, this.color, adjustRow)
    this.kill_and_land = getPossibleEnpassantAttacks(this.column, this.row, this.color, adjustRow, 4, this.moveCount)

    // if (this.kill_and_land.length > 0) { console.log('BLACK: ' + JSON.stringify(this.kill_and_land, null, 6)) }
  }
}

// + --------------------------------------------------------------------------+
/*
class PawnBlack extends Piece {
  constructor (unicode, column, row, color, id, name) {
    super(unicode, column, row, color, id, name, 1)
    this.moves = {}
    this.attacks = {}
    this.enpassanted_pawn_cells = []
  }
  reset () {
    this.moves = {}
    this.attacks = {}
    this.enpassanted_pawn_cells = []
  }

  sussPossiblePawnMoves () {
    let adjustRow = -1 // Go up the board
    this.moves = getPossiblePawnMoves(this.moveCount, this.column, this.row, this.color, adjustRow)
  }
  sussPossiblePawnAttackMoves () {
    let adjustRow = -1 // Go up the board
    this.attacks = getPossibleAttacks(this.column, this.row, this.color, adjustRow)
    this.LoH_enpassant_piece_and_target = getPossibleEnpassantAttacks(this.column, this.row, this.color, adjustRow, 4)
  }
}
*/
/*
// + --------------------------------------------------------------------------+
let pieces = {}

pieces['wk'] = new King('\u2654', 4, 7, WHITE, 'wk', 'white_king')
pieces['bk'] = new King('\u265A', 4, 0, BLACK, 'bk', 'black_king')
    //
pieces['wq'] = new Queen('\u2655', 3, 7, WHITE, 'wq', 'white_queen')
pieces['bq'] = new Queen('\u265B', 3, 0, BLACK, 'bq', 'black_queen')
    //
pieces['wr1'] = new Rook('\u2656', 0, 7, WHITE, 'wr1', 'white_rook_queenside')
pieces['wr2'] = new Rook('\u2656', 7, 7, WHITE, 'wr2', 'white_rook_kingside')
pieces['br1'] = new Rook('\u265C', 0, 0, BLACK, 'br1', 'black_rook_queenside')
pieces['br2'] = new Rook('\u265C', 7, 0, BLACK, 'br2', 'black_rook_kingside')
    //
pieces['wb1'] = new Bishop('\u2657', 2, 7, WHITE, 'wb1', 'white_bishop_queenside')
pieces['wb2'] = new Bishop('\u2657', 5, 7, WHITE, 'wb2', 'white_bishop_kingside')
pieces['bb1'] = new Bishop('\u265D', 2, 0, BLACK, 'bb1', 'black_bishop_queenside')
pieces['bb2'] = new Bishop('\u265D', 5, 0, BLACK, 'bb2', 'black_bishop_kingside')
    //
pieces['wk1'] = new Knight('\u2658', 1, 7, WHITE, 'wk1', 'white_knight_queenside')
pieces['wk2'] = new Knight('\u2658', 6, 7, WHITE, 'wk2', 'white_knight_kingside')
pieces['bk1'] = new Knight('\u265E', 1, 0, BLACK, 'bk1', 'black_knight_queenside')
pieces['bk2'] = new Knight('\u265E', 6, 0, BLACK, 'bk2', 'black_knight_kingside')
    //
pieces['wp1'] = new PawnWhite('\u2659', 0, 6, WHITE, 'wp1', 'white_pawn_1')
pieces['wp2'] = new PawnWhite('\u2659', 1, 6, WHITE, 'wp2', 'white_pawn_2')
pieces['wp3'] = new PawnWhite('\u2659', 2, 6, WHITE, 'wp3', 'white_pawn_3')
pieces['wp4'] = new PawnWhite('\u2659', 3, 6, WHITE, 'wp4', 'white_pawn_4')
pieces['wp5'] = new PawnWhite('\u2659', 4, 6, WHITE, 'wp5', 'white_pawn_5')
pieces['wp6'] = new PawnWhite('\u2659', 5, 6, WHITE, 'wp6', 'white_pawn_6')
pieces['wp7'] = new PawnWhite('\u2659', 6, 6, WHITE, 'wp7', 'white_pawn_7')
pieces['wp8'] = new PawnWhite('\u2659', 7, 6, WHITE, 'wp8', 'white_pawn_8')
    //
pieces['bp1'] = new PawnBlack('\u265F', 0, 1, BLACK, 'bp1', 'black_pawn_1')
pieces['bp2'] = new PawnBlack('\u265F', 1, 1, BLACK, 'bp2', 'black_pawn_2')
pieces['bp3'] = new PawnBlack('\u265F', 2, 1, BLACK, 'bp3', 'black_pawn_3')
pieces['bp4'] = new PawnBlack('\u265F', 3, 1, BLACK, 'bp4', 'black_pawn_4')
pieces['bp5'] = new PawnBlack('\u265F', 4, 1, BLACK, 'bp5', 'black_pawn_5')
pieces['bp6'] = new PawnBlack('\u265F', 5, 1, BLACK, 'bp6', 'black_pawn_6')
pieces['bp7'] = new PawnBlack('\u265F', 6, 1, BLACK, 'bp7', 'black_pawn_7')
pieces['bp8'] = new PawnBlack('\u265F', 7, 1, BLACK, 'bp8', 'black_pawn_8')

*/

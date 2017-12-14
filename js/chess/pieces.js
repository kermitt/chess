const pieces = {}
class Piece {
  constructor (type, id, key, unicode, cellId) {
    this.type = type
    this.id = id
    this.key = key
    this.unicode = unicode
    this.cellId = cellId
    this.moveCount = 0
    this.x = 0
    this.y = 0
  }
}

pieces['WHITE_KING_1'] = new Piece('king', 1, 'WHITE_KING_1', '\u2654', 40)
pieces['WHITE_QUEEN_1'] = new Piece('queen', 2, 'WHITE_QUEEN_1', '\u2655', 32)
pieces['WHITE_ROOK_1'] = new Piece('rook', 3, 'WHITE_ROOK_1', '\u2656', 8)
pieces['WHITE_ROOK_2'] = new Piece('rook', 4, 'WHITE_ROOK_2', '\u2656', 64)
pieces['WHITE_BISHOP_1'] = new Piece('bishop', 5, 'WHITE_BISHOP_1', '\u2657', 24)
pieces['WHITE_BISHOP_2'] = new Piece('bishop', 6, 'WHITE_BISHOP_2', '\u2657', 48)
// pieces['WHITE_KNIGHT_1'] = new Piece('knight', 7, 'WHITE_KNIGHT_1', '\u2658', 16)
pieces['WHITE_KNIGHT_1'] = new Piece('knight', 7, 'WHITE_KNIGHT_1', '\u2658', 29)
pieces['WHITE_KNIGHT_2'] = new Piece('knight', 8, 'WHITE_KNIGHT_2', '\u2658', 56)
pieces['WHITE_PAWN_1'] = new Piece('pawn', 9, 'WHITE_PAWN_1', '\u2659', 7)
pieces['WHITE_PAWN_2'] = new Piece('pawn', 10, 'WHITE_PAWN_2', '\u2659', 15)
pieces['WHITE_PAWN_3'] = new Piece('pawn', 11, 'WHITE_PAWN_3', '\u2659', 23)
pieces['WHITE_PAWN_4'] = new Piece('pawn', 12, 'WHITE_PAWN_4', '\u2659', 31)
pieces['WHITE_PAWN_5'] = new Piece('pawn', 13, 'WHITE_PAWN_5', '\u2659', 39)
pieces['WHITE_PAWN_6'] = new Piece('pawn', 14, 'WHITE_PAWN_6', '\u2659', 47)
pieces['WHITE_PAWN_7'] = new Piece('pawn', 15, 'WHITE_PAWN_7', '\u2659', 55)
pieces['WHITE_PAWN_8'] = new Piece('pawn', 16, 'WHITE_PAWN_8', '\u2659', 63)

pieces['BLACK_KING_1'] = new Piece('king', 101, 'BLACK_KING_1', '\u265A', 33)
pieces['BLACK_QUEEN_1'] = new Piece('queen', 102, 'BLACK_QUEEN_1', '\u265B', 25)
pieces['BLACK_ROOK_1'] = new Piece('rook', 103, 'BLACK_ROOK_1', '\u265C', 1)
pieces['BLACK_ROOK_2'] = new Piece('rook', 104, 'BLACK_ROOK_2', '\u265C', 57)
pieces['BLACK_BISHOP_1'] = new Piece('bishop', 105, 'BLACK_BISHOP_1', '\u265D', 17)
pieces['BLACK_BISHOP_2'] = new Piece('bishop', 106, 'BLACK_BISHOP_2', '\u265D', 41)
pieces['BLACK_KNIGHT_1'] = new Piece('knight', 107, 'BLACK_KNIGHT_1', '\u265E', 9)
pieces['BLACK_KNIGHT_2'] = new Piece('knight', 108, 'BLACK_KNIGHT_2', '\u265E', 49)
pieces['BLACK_PAWN_1'] = new Piece('pawn', 109, 'BLACK_PAWN_1', '\u265F', 2)
pieces['BLACK_PAWN_2'] = new Piece('pawn', 110, 'BLACK_PAWN_2', '\u265F', 10)
pieces['BLACK_PAWN_3'] = new Piece('pawn', 111, 'BLACK_PAWN_3', '\u265F', 18)
pieces['BLACK_PAWN_4'] = new Piece('pawn', 112, 'BLACK_PAWN_4', '\u265F', 26)
pieces['BLACK_PAWN_5'] = new Piece('pawn', 113, 'BLACK_PAWN_5', '\u265F', 34)
pieces['BLACK_PAWN_6'] = new Piece('pawn', 114, 'BLACK_PAWN_6', '\u265F', 42)
pieces['BLACK_PAWN_7'] = new Piece('pawn', 115, 'BLACK_PAWN_7', '\u265F', 50)
pieces['BLACK_PAWN_8'] = new Piece('pawn', 116, 'BLACK_PAWN_8', '\u265F', 58)

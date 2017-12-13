const pieces = {} 
class Piece {
  constructor (name, unicode) {
    // e["g[", 'white king', '\u2654'
    this.name = name
    this.unicode = unicode
    this.current_row = 0
    this.current_col = 0
  }
}
pieces["WHITE_KING"] = new Piece('White King', '\u2654')
pieces["BLACK_KING"] = new Piece('Black King', '\u265A')
pieces["WHITE_QUEEN"] = new Piece('White Queen', '\u2655')
pieces["BLACK_QUEEN"] = new Piece('Black Queen', '\u265B')
pieces["WHITE_ROOK"] = new Piece('White Rook', '\u2656')
pieces["BLACK_ROOK"] = new Piece('Black Rook', '\u265C')
pieces["WHITE_BISHOP"] = new Piece('White Bishop', '\u2657')
pieces["BLACK_BISHOP"] = new Piece('Black Bishop', '\u265D')
pieces["WHITE_KNIGHT"] = new Piece('White Knight', '\u2658')
pieces["BLACK_KNIGHT"] = new Piece('Black Knight', '\u265E')
pieces["WHITE_PAWN"] = new Piece('White Pawn', '\u2659')
pieces["BLACK_PAWN"] = new Piece('Black Pawn', '\u265F')

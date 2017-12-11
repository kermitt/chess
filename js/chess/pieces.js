class Piece {
  constructor (name, unicode) {
    // e.g., 'white king', '\u2654'
    this.name = name
    this.unicode = unicode
    this.current_row = 0
    this.current_col = 0
  }
}

let WHITE_KING = new Piece('White King', '\u2654')
let BLACK_KING = new Piece('Black King', '\u265A')
let WHITE_QUEEN = new Piece('White Queen', '\u2655')
let BLACK_QUEEN = new Piece('Black Queen', '\u265B')
let WHITE_ROOK = new Piece('White Rook', '\u2656')
let BLACK_ROOK = new Piece('Black Rook', '\u265C')
let WHITE_BISHOP = new Piece('White Bishop', '\u2657')
let BLACK_BISHOP = new Piece('Black Bishop', '\u265D')
let WHITE_KNIGHT = new Piece('White Knight', '\u2658')
let BLACK_KNIGHT = new Piece('Black Knight', '\u265E')
let WHITE_PAWN = new Piece('White Pawn', '\u2659')
let BLACK_PAWN = new Piece('Black Pawn', '\u265F')

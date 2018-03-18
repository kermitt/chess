const WHITE = 'white'
const BLACK = 'black'
class Piece {
    constructor(unicode, row, column, color, id, name,travel) {
        this.unicode = unicode // diplay
        this.y = column
        this.x = row
        this.boardId = 'r' + this.x + 'c' + this.y
        this.color = color // side
        this.moveCount = 0 // this will be important for Castling and En-passant... and, hopefully, for analytics
        this.travel = travel // # possible spaces - this will get weird for pawns
        this.id = id
        this.html = "<div class='piece'>" + this.unicode + '</div>'
        board[this.boardId].pid = id
        document.getElementById(this.boardId).innerHTML = this.html
        this.isPawn = false
        this.isKing = false
        this.isDead = false
    }
    getTravel() {
        return this.travel
    }
}

class King extends Piece {
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 1)
        this.isKing = true
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
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 7)
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
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 7)
        this.moves = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ]
    }
}

class Bishop extends Piece {
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 7)
        this.moves = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1]
        ]
    }
}
class Knight extends Piece {
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 1)
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
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 1)
        this.isPawn = true
        this.enpassat_row = 3 // Row from which enpassant attack is possible
        this.move = -1
        this.moves = [
            [-1, 0]
        ]
    }
}
class PawnBlack extends Piece {
    constructor(unicode, y, x, color, id, name) {
        super(unicode, y, x, color, id, name, 1)
        this.isPawn = true
        this.enpassat_row = 4 // Row from which enpassant attack is possible
        this.move = 1
        this.moves = [
            [1, 0]
        ]
    }
}

// + --------------------------------------------------------------------------+
let pieces = {}

pieces['wk'] = new King('\u2654', 7, 4, WHITE, 'wk', 'white_king')
pieces['bk'] = new King('\u265A', 0, 4, BLACK, 'bk', 'black_king')
//
pieces['wq'] = new Queen('\u2655', 7, 3, WHITE, 'wq', 'white_queen')
pieces['bq'] = new Queen('\u265B', 0, 3, BLACK, 'bq', 'black_queen')
//
pieces['wr1'] = new Rook('\u2656', 7, 0, WHITE, 'wr1', 'white_rook_queenside')
pieces['wr2'] = new Rook('\u2656', 7, 7, WHITE, 'wr2', 'white_rook_kingside')
pieces['br1'] = new Rook('\u265C', 0, 0, BLACK, 'br1', 'black_rook_queenside')
pieces['br2'] = new Rook('\u265C', 0, 7, BLACK, 'br2', 'black_rook_kingside')
//
/*
pieces['wb1'] = new Bishop('\u2657', 7, 2, WHITE, 'wb1', 'white_bishop_queenside')
pieces['wb2'] = new Bishop('\u2657', 7, 5, WHITE, 'wb2', 'white_bishop_kingside')
pieces['bb1'] = new Bishop('\u265D', 0, 2, BLACK, 'bb1', 'black_bishop_queenside')
pieces['bb2'] = new Bishop('\u265D', 0, 5, BLACK, 'bb2', 'black_bishop_kingside')
//
pieces['wk1'] = new Knight('\u2658', 7, 1, WHITE, 'wk1', 'white_knight_queenside')
pieces['wk2'] = new Knight('\u2658', 7, 6, WHITE, 'wk2', 'white_knight_kingside')
pieces['bk1'] = new Knight('\u265E', 0, 1, BLACK, 'bk1', 'black_knight_queenside')
pieces['bk2'] = new Knight('\u265E', 0, 6, BLACK, 'bk2', 'black_knight_kingside')
*/
//
pieces['wp1'] = new PawnWhite('\u2659', 6, 0, WHITE, 'wp1', 'white_pawn_1')
pieces['wp2'] = new PawnWhite('\u2659', 6, 1, WHITE, 'wp2', 'white_pawn_2')
pieces['wp3'] = new PawnWhite('\u2659', 6, 2, WHITE, 'wp3', 'white_pawn_3')
pieces['wp4'] = new PawnWhite('\u2659', 6, 3, WHITE, 'wp4', 'white_pawn_4')
pieces['wp5'] = new PawnWhite('\u2659', 6, 4, WHITE, 'wp5', 'white_pawn_5')
pieces['wp6'] = new PawnWhite('\u2659', 6, 5, WHITE, 'wp6', 'white_pawn_6')
pieces['wp7'] = new PawnWhite('\u2659', 6, 6, WHITE, 'wp7', 'white_pawn_7')
pieces['wp8'] = new PawnWhite('\u2659', 6, 7, WHITE, 'wp8', 'white_pawn_8')
//
pieces['bp1'] = new PawnBlack('\u265F', 1, 0, BLACK, 'bp1', 'black_pawn_1')
pieces['bp2'] = new PawnBlack('\u265F', 1, 1, BLACK, 'bp2', 'black_pawn_2')
pieces['bp3'] = new PawnBlack('\u265F', 1, 2, BLACK, 'bp3', 'black_pawn_3')
pieces['bp4'] = new PawnBlack('\u265F', 1, 3, BLACK, 'bp4', 'black_pawn_4')
pieces['bp5'] = new PawnBlack('\u265F', 1, 4, BLACK, 'bp5', 'black_pawn_5')
pieces['bp6'] = new PawnBlack('\u265F', 1, 5, BLACK, 'bp6', 'black_pawn_6')
pieces['bp7'] = new PawnBlack('\u265F', 1, 6, BLACK, 'bp7', 'black_pawn_7')
pieces['bp8'] = new PawnBlack('\u265F', 1, 7, BLACK, 'bp8', 'black_pawn_8')

try {
    module.exports = {
        pieces: pieces
    }
} catch (ignore) {
    // Export is for testing purposes...
    // If this 'error' occures, then that means that the context is a browser.
    // QED : Not an error
}
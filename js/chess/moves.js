
class Moves {
  static show_possible_moves (piece) {
    return this.getPossibleMoves(piece.type)
  }

  static getPossibleMoves (key, moveCount) {
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

    let moves = {}
    if (type === 'ROOK') {
      moves[1] = 7
      moves[-1] = 7
      moves[-8] = 7
      moves[8] = 7
    } else if (type === 'KNIGHT') {
      moves[6] = 1
      moves[15] = 1
      moves[17] = 1
      moves[10] = 1

      moves[-6] = 1
      moves[-15] = 1
      moves[-17] = 1
      moves[-10] = 1
    } else if (type === 'BISHOP') {
      moves[7] = 7
      moves[-7] = 7
      moves[9] = 7
      moves[-9] = 7
    } else if (type === 'QUEEN') {
      moves[7] = 7
      moves[-7] = 7
      moves[9] = 7
      moves[-9] = 7
      moves[1] = 7
      moves[-1] = 7
      moves[-8] = 7
      moves[8] = 7
    } else if (type === 'KING') {
      moves[7] = 1
      moves[-7] = 1
      moves[9] = 1
      moves[-9] = 1
      moves[1] = 1
      moves[-1] = 1
      moves[-8] = 1
      moves[8] = 1
    } else if (type === 'PAWN' && color === 'BLACK' && moveCount === 0) {
      moves[-1] = 1
      moves[-2] = 1
    } else if (type === 'PAWN' && color === 'WHITE' && moveCount === 0) {
      moves[1] = 1
      moves[2] = 1
    } else if (type === 'PAWN' && color === 'BLACK') {
      moves[-1] = 1
    } else if (type === 'PAWN' && color === 'WHITE') {
      moves[1] = 1
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

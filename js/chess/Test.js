var Model = require('./Models.js')
// let board2 = new Model.Board()

function dragStart_test () {
  let pieces = new Model.Pieces()
  let moves = new Model.Moves()
  let board = new Model.Board()

  let id_from_d3 = 'BLACK_PAWN_3'
  let p = pieces.pieces[id_from_d3]
  let LoL_influences = moves.getPossibleMoves(p.key, p.moveCount)

  let isOk = LoL_influences[0][0] == 0 && LoL_influences.length == 2

  log(isOk, 'dragStart_test')
}

function snapToComponent_findClosestLegalCell () {
  let board = new Model.Board()
  board.setEveryCellLocations(50)
  board.board[2][3].isInfluenced = true
  board.board[2][4].isInfluenced = true

  let x = 140
  let y = 220
  let horizon = 50
  let result = board.findClosestLegalCell(x, y, horizon)

  let expected = 'cr_2_4'

  let isOk = expected === result
  log(isOk, 'snapToComponent_findClosestLegalCell')
}
function getXYOfACell () {
  let board = new Model.Board()
  board.setEveryCellLocations(50)

  let x = board.getXLocation('cr_2_4')
  let y = board.getYLocation('cr_2_4')

  let expectedX = 125
  let expectedY = 225

  let isOk = x == expectedX && y == expectedY
  log(isOk, 'getXYOfACell')
}

function influenceTest () {
  let board = new Model.Board()
  let moves = new Model.Moves()
  let pieces = new Model.Pieces()

  let cellId = 'cr_3_3'
  let pieceId = 'BLACK_ROOK_2'
  let LoL_influences = moves.getPossibleMoves(pieceId, 0)

  let pieces_whichCell_whichColor = {}
  for (let key in pieces.pieces) {
    let blackOrWhite = pieces.pieces[key].color
    let cId = pieces.pieces[key].cellId
    pieces_whichCell_whichColor[cId] = blackOrWhite
  }

  LoL_influences.forEach((tuple) => {
    influence(3, 3, tuple[0], tuple[1], board, pieces, pieces_whichCell_whichColor)
  })
}

function influence (col, row, vectorY, vectorX, board, pieces, pieces_whichCell_whichColor) {
  try {
    let potential = board.board[col][row]
    if (potential != undefined) {
      let c = col + vectorY
      let r = row + vectorX

      if (c < 8 && c >= 0 && r < 8 && r >= 0) {
        let cellId = 'cr_' + c + '_' + r

        console.log('Move' + col + ', ' + row + '  ---> ' + vectorX + ', ' + vectorY + ' checking for ' + cellId)

        if (!pieces_whichCell_whichColor.hasOwnProperty(cellId)) {
          influence(c, r, vectorY, vectorX, board, pieces, pieces_whichCell_whichColor)
        } else {
          console.log('Stopping at ' + cellId + ' because ' + pieces_whichCell_whichColor[cellId])
        }
      }
    } else {
    }
  } catch (boom) {
    console.log('Boom: ' + boom)
  }
}

function sortPieces () {
  let pieces = new Model.Pieces()

  // for (let k in pieces.pieces) {
  //  let p = pieces.pieces[k]
  //  console.log(k + '\t' + p.cellId)
  // }

// let x = [{name: 'bob', age: 55}, {name: 'bob', age: 12}, {name: 'alice', age: 12}, {name: 'zoo', age: 12}]
// x.sort((personA, personB) => personA.name > personB.name).sort((personA, personB) => personA.age > personB.age).filter(a => a.name === 'bob')
}

// + ----------------------------------- +

function log (pass_or_fail, msg) {
  let verdict = pass_or_fail ? 'PASS' : 'FAIL'
  console.log(verdict + '\t' + msg)
}
function unroll (obj) {
  console.log(JSON.stringify(obj, null, 6))
}
function main () {
  dragStart_test()
  snapToComponent_findClosestLegalCell()
  getXYOfACell()
  influenceTest()
//  sortPieces()
}
main()

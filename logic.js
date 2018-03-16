        //grilled cheese cactuses mushroom lightbulbs spo0nge 


const BLACK_CELL = 'cell_black'
const WHITE_CELL = 'cell_white'
const SUPPORT = "#0000ff"
const ATTACK = "#ff0000"
const INFLUENCE = "#ffff00"
const SELECTED = "#00ffff"
let possible = {}
let activePid = ""
let turn = WHITE
let history = [] 

const getRowCol= (candidate) => {
  //"r2c6"
  let ary = candidate.split("c")
  let row = parseInt(ary[0].replace("r",""))
  let col = parseInt(ary[1])
  return [row,col]
}

const resetAllCells = () => {
  for ( var id in board) {
    resetCellColor(id)
  }
}
const resetCellColor = (id) => {
  let bgcolor = "#00ff00"
  if ( board[id].css == WHITE_CELL) {
    bgcolor="#ffffff"
  }
  document.getElementById(id).style.backgroundColor = bgcolor
}


// This does not cover pawns or kings.
const possibleMoves = () => {
  let p = pieces[activePid]
  p.moves.forEach((xy)=>{
    let x = p.x
    let y = p.y
    let i = 0
    let continueOn = true
    while ( i < p.travel && continueOn) {
      i++
      x += xy[0]
      y += xy[1]
      if ( isOnboard(x, y ))  { //}      if ( x > -1 && x < 8 && y > -1 && y < 8 ) {
        let cellId = 'r' + x + 'c' + y
        let pid = board[cellId].pid

        if ( pid.length > 0) {
          let b = pieces[pid]
          let a = pieces[activePid]
          if ( a.color === b.color ) {
            possible[cellId] = SUPPORT
            continueOn = false
          } else {
            possible[cellId] = ATTACK
            continueOn = false
          }
        } else {
          possible[cellId] = INFLUENCE
        }
      }
      for ( let cellId in possible ) { 
        document.getElementById(cellId).style.backgroundColor = possible[cellId]
      }
    }
  })
}
const isOnboard = (x,y) =>  {
  if ( x > -1 && x < 8 && y > -1 && y < 8 ) {
    return true 
  } 
  return false
}


function cell_click (human, cellId) {
  let pid = board[cellId].pid
  // BEGIN A MOVE 
  if ( pid.length > 0 && ! possible.hasOwnProperty(cellId) && pieces[pid].color == turn) {
    let piece = pieces[pid]
    possible = {}
    resetAllCells()
    activePid = pid
    document.getElementById(cellId).style.backgroundColor = SELECTED
    if ( piece.id.startsWith("wp") || piece.id.startsWith("bp")) {
      pawnMove(cellId, piece)
    } else if ( piece.id == "wk" || piece.id == "bk") {
      kingMove(cellId, piece)
    } else {
      possibleMoves()
    } 
  } else {
    // END A MOVE 
    if ( possible.hasOwnProperty(cellId)) {
      if ( possible[cellId] == INFLUENCE || possible[cellId] == ATTACK) {
        if ( possible[cellId] == ATTACK) {
          killPieceOn(cellId)
        }
        let a = pieces[activePid]
        a.moveCount++

        addToHistory(activePid, a.boardId, cellId)

        document.getElementById(a.boardId).innerHTML = ""
        board[a.boardId].pid = "" // remove record of the piece from the old cell
        a.boardId = cellId
        board[a.boardId].pid = a.id // set record of the piece to the new cell
        document.getElementById(a.boardId).innerHTML = a.html
        let xy = getRowCol(cellId)
        a.x = xy[0]       
        a.y = xy[1]


        possible = {}
        resetAllCells()
        if ( turn == WHITE ) {
          turn = BLACK
        } else {
          turn = WHITE
        }      
        setTurn()
      } else {
        possible = {}
        resetAllCells()
      }
    }
  }
}
const addToHistory = (activePid, boardId, cellId) => { 
  let summary = {}
  //history = []
  summary.pieceId = activePid // which piece
  summary.startCell = boardId // from cell
  summary.endCell = cellId // to cell 
  history.push(summary)
  console.log(JSON.stringify(history,null,6))
  let html = "<table border = '1'>"
  let i = 0
  history.forEach((hist)=> { 
    let pieceId = hist.pieceId
    let startCell = hist.startCell
    let endCell = hist.endCell
    if ( i == 0 ) { 
      html += "<tr><td><button class='hist' onclick='summarySelect(i);'>id: " + pieceId + "|from: " + startCell + "|to: "+  endCell + "</button></td>"
 
    } else {
      html += "</td><td><button class='hist' onclick='summarySelect(i);'>id: " + pieceId + "|from: " + startCell + "|to: "+  endCell + "</button></td></tr>"
    }
    i++
    if ( i > 1 ) {
      i = 0
    }
  })
  html += "</table>"
  document.getElementById("pgn").innerHTML = html


} 

const killPieceOn = (cellId) => { 
  let c = board[cellId]
  let p = pieces[c.pid]
  html = document.getElementById("dead").innerHTML
  let count = html.split("br")
  html += p.unicode + "<br/>"
  document.getElementById("dead").innerHTML = html
}

function setTurn() {
  document.getElementById("turn").innerHTML = turn
}
setTurn()

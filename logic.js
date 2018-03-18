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
const ENPASSANT = 'enpassant'
const PAWN_MOVED_TWICE = 'pawn_moved_twice'
const CASTLE = 'castle'
let NORMAL = 'normal'

const killPieceOn = (cellId) => { 
  let c = board[cellId]
  let p = pieces[c.pid]
  p.isDead = true
  html = document.getElementById("dead").innerHTML
  board[cellId].pid = ""
  document.getElementById(cellId).innerHTML = ""
  let count = html.split("br")
  html += p.unicode + "<br/>"
  document.getElementById("dead").innerHTML = html
}

function remove_selected() { 
  if ( activePid.length > 0 ) {
    killPieceOn( pieces[activePid].boardId)
    resetAllCells()

  } else {
    alert("There is no active piece to remove.")
  }
}

function setTurn() {
  document.getElementById("turn").innerHTML = turn
}
setTurn()


const getRowCol= (candidate) => {
  //"r2c6"
  let ary = candidate.split("c")
  let row = parseInt(ary[0].replace("r",""))
  let col = parseInt(ary[1])
  return [row,col]
}

const composeCellId = (x,y) => { 
  let cellId = 'r' + x + 'c' + y
  return cellId
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
      if ( isOnboard(x, y ))  {
        let cellId = 'r' + x + 'c' + y
        let pid = board[cellId].pid

        if ( pid.length > 0) {
          let b = pieces[pid]
          let a = pieces[activePid]
          if ( a.color === b.color ) {
            possible[cellId] = {result:SUPPORT, type:NORMAL}
            continueOn = false
          } else {
            possible[cellId] = {result:ATTACK, type:NORMAL}
            continueOn = false
          }
        } else {
          possible[cellId] = {result:INFLUENCE, type:NORMAL}
        }
      }
      for ( let cellId in possible ) { 
        document.getElementById(cellId).style.backgroundColor = possible[cellId].result
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
  //if ( pid.length > 0 && ! possible.hasOwnProperty(cellId) && pieces[pid].color == turn) {

  let isOk = false
  if ( CURRENT_MODE == PLAY_MODE ) {
    isOk = ( pid.length ) > 0 && ! ( possible.hasOwnProperty(cellId)) && (pieces[pid].color == turn)
  } else if ( CURRENT_MODE == EXPLORE_MODE) {
    isOk = ( pid.length ) > 0 && ! ( possible.hasOwnProperty(cellId))
  }
  if ( isOk ) { 
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
      if ( possible[cellId].result == INFLUENCE || possible[cellId].result == ATTACK) {
        if ( possible[cellId].result == ATTACK) {
          if ( possible[cellId].type == NORMAL ) {
            killPieceOn(cellId)
          } else if ( possible[cellId].type == ENPASSANT ) {
            let rowCol = getRowCol(cellId)
            let row = rowCol[0] + pieces[activePid].move * -1 // Flip the sign: neg to pos & vv.
            let col = rowCol[1]
            let cellIdBehind = composeCellId(row,col)
            killPieceOn(cellIdBehind)
          }
        }
        let a = pieces[activePid]
        a.moveCount++
        addToHistory(activePid, a.boardId, cellId, possible[cellId].result, possible[cellId].type)

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

const makeTable = () =>  { 
  // TODO: Be less dumb
  let html = "<table border='1'>"
  let i = 0;
  while ( i < 200) {
    html += "<tr>"
    html += "<td><div id='m" + i + "'></div></td>"
    i++
    html += "<td><div id='m" + i + "'></div></td>"
    i++
    html += "</tr>"
  }
  document.getElementById("pgn").innerHTML = html
}
makeTable()

const addToHistory = (activePid, boardId, cellId, result, type) => { 
  let summary = {}
  summary.pieceId = activePid // which piece
  summary.startCell = boardId // from cell
  summary.endCell = cellId // to cell 
  summary.result = result // attack or support or influence?
  summary.type = type // normal or enpassant or castle?
  history.push(summary)
  let i = history.length - 1
  html = "<button class='hist' onclick='summarySelect(" + i + ");'>" + summary.pieceId + " | " + summary.type + "</button>"  
  document.getElementById("m" + i ).innerHTML = html 
}
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

const showInfluence = () => {
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
const pawnMove = (cellId, pawn) => {
  //console.log(JSON.stringify(pawn,null,6))
  let north_or_south = -1 // white piece
  if ( pawn.color == BLACK ) {
    north_or_south = 1 // black piece
  }  
  let possibleX = pawn.x + north_or_south

  // forward 1 
  if ( isOnboard(possibleX,pawn.y ))  {
    let cellId = 'r' + possibleX + 'c' +pawn.y 
    let pid = board[cellId].pid
    if ( pid.length > 0) {
      // blocked!
    } else {
      possible[cellId] = INFLUENCE
    }
  }

  // attack or support one side, if possible 
  let possibleY = pawn.y + 1 
  if ( isOnboard(possibleX,possibleY ))  {
    let cellId = 'r' + possibleX + 'c' + possibleY
    let pid = board[cellId].pid
    if ( pid.length > 0) {
      if ( pieces[pid].color == pawn.color) {
        possible[cellId] = SUPPORT
      } else { 
        possible[cellId] = ATTACK        
      }
    } else {
      // Nothing there! 
    }
  }

  // attack or support one side, if possible 
  possibleY = pawn.y - 1 
  if ( isOnboard(possibleX,possibleY ))  {
    let cellId = 'r' + possibleX + 'c' + possibleY
    let pid = board[cellId].pid
    if ( pid.length > 0) {
      if ( pieces[pid].color == pawn.color) {
        possible[cellId] = SUPPORT
      } else { 
        possible[cellId] = ATTACK        
      }
    } else {
      // Nothing there! 
    }
  }

  



  // forward 2 
  if ( pawn.moveCount == 0 ) {
    possibleX  += north_or_south
    if ( isOnboard(possibleX,pawn.y ))  {
      let cellId = 'r' + possibleX + 'c' + pawn.y 
      let pid = board[cellId].pid
      if ( pid.length > 0) {
        // blocked!
      } else {
        possible[cellId] = INFLUENCE 
      }
    }
  }






  for ( let cellId in possible ) { 
    document.getElementById(cellId).style.backgroundColor = possible[cellId]
  }
}
const kingMove = (cellId, king) => { 
}
function cell_click (human, cellId) {
  let pid = board[cellId].pid
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
      showInfluence()
      //console.log(JSON.stringify(piece,null,6))
    } 
  } else {
    if ( possible.hasOwnProperty(cellId)) {
      if ( possible[cellId] == INFLUENCE || possible[cellId] == ATTACK) {
        if ( possible[cellId] == ATTACK) {
          killPieceOn(cellId)
        }
        let a = pieces[activePid]
        a.moveCount++
        document.getElementById(a.boardId).innerHTML = ""
        board[a.boardId].pid = ""
        a.boardId = cellId
        board[a.boardId].pid = a.id
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
    } else {
    }
    console.log("! pid >" + pid + "<   " + activePid )
  }
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

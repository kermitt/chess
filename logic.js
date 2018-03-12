const BLACK_CELL = 'cell_black'
const WHITE_CELL = 'cell_white'
const SUPPORT = "#0000ff"
const ATTACK = "#ff0000"
const INFLUENCE = "#ffff00"
const SELECTED = "#00ffff"
let possible = {}
let activePid = ""

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
      if ( x > -1 && x < 8 && y > -1 && y < 8 ) {
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


function cell_click (human, cellId) {
  let pid = board[cellId].pid
  if ( pid.length > 0 && ! possible.hasOwnProperty(cellId)) {
    possible = {}
    resetAllCells()
    activePid = pid
    showInfluence()
    document.getElementById(cellId).style.backgroundColor = SELECTED
    let piece = pieces[pid]
  } else {
    if ( possible.hasOwnProperty(cellId)) {
      if ( possible[cellId] == INFLUENCE ) {
        let a = pieces[activePid]
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
      } 
      else if ( possible[cellId] == ATTACK ) {
console.log("ATTACK !")
          let a = pieces[activePid]
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
      }
    } else {
    }
    console.log("! pid >" + pid + "<   " + activePid )
  }
}

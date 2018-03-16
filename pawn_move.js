const moveNorthOrsouth = (x,y) => {
    if ( isOnboard(x,y ))  {
        let cellId = 'r' + x + 'c' + y 
        let pid = board[cellId].pid
        if ( pid.length > 0) {// if the cell we have going to has a piece on it:
            // blocked!
        } else {
            possible[cellId] = INFLUENCE 
            return true
        }
    }
    return false
}

const attackLeftOrRight = (x, y, pawn ) => {
    if ( isOnboard(x,y ))  {
        let cellId = 'r' + x + 'c' + y
        let pid = board[cellId].pid 
        if ( pid.length > 0) { // if the cell we have going to has a piece on it:
            if ( pieces[pid].color == pawn.color) {
                possible[cellId] = SUPPORT
            } else { 
                possible[cellId] = ATTACK        
            }
        }
    }
}

const pawnMove = (cellId, pawn) => {
    let north_or_south = -1 // white piece
    if ( pawn.color == BLACK ) {
      north_or_south = 1 // black piece
    }  

    //let possibleX = pawn.x + north_or_south
    let wasNotBlocked = moveNorthOrsouth(pawn.x + north_or_south,pawn.y)
    if ( wasNotBlocked && pawn.moveCount == 0 ) {
        moveNorthOrsouth(pawn.x + ( north_or_south * 2 ) ,pawn.y) 
    }

    attackLeftOrRight(pawn.x + north_or_south,pawn.y + 1, pawn)
    attackLeftOrRight(pawn.x + north_or_south,pawn.y - 1, pawn)


    for ( let cellId in possible ) { 
      document.getElementById(cellId).style.backgroundColor = possible[cellId]
    }
  }

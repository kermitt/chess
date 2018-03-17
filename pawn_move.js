const pawn_attack = (pawn) => {
    let x = pawn.x + pawn.move
    let yy = [pawn.y - 1, pawn.y + 1]
    yy.forEach((y)=>{
        if (isOnboard(x, y)) {
            let cellId = 'r' + x + 'c' + y
            let pid = board[cellId].pid
            if (pid.length > 0) {
                if (pieces[pid].color == pawn.color) {
                    possible[cellId] = {result:SUPPORT, type:NORMAL}
                } else {
                    possible[cellId] = {result:ATTACK, type:NORMAL}
                }
            }
        }
    })
}

const pawn_enpassant=(pawn)=> {
    if ( history.length > 0 ) { 
        let summary = history[history.length - 1]
        // The last move was a pawn that moved twice?
        if ( summary.type == PAWN_MOVED_TWICE) {
            // The current pawn is on a ROW from which an enpassant is possible? ( ROW )
            if ( pawn.enpassat_row == pawn.x )  {
                // The current pawn is adjacent to an enpassantable pawn? ( COLUMN )
                rowCol = getRowCol(summary.endCell)
                let row = rowCol[0]
                let col = rowCol[1]
                if ( ( col + 1) == pawn.y) {
                    // remember1: 'pawn.move' is pos1 or neg1 ( white or black )
                    // remember2: pawn.y - 1 or + 1? need to reverse
                    let cellId = composeCellId(pawn.x + pawn.move, pawn.y - 1)
                    possible[cellId] = {result:ATTACK, type:ENPASSANT}
                }  else if ( ( col - 1 ) == pawn.y) {
                    let cellId = composeCellId(pawn.x + pawn.move, pawn.y + 1)
                    possible[cellId] = {result:ATTACK, type:ENPASSANT}
                }           
            }          
        }
    }
}
const pawn_movement=(pawn)=> {
    let x1 = pawn.x + pawn.move
    let y = pawn.y
    if (isOnboard(x1, pawn.y)) {
        let cellId1 = 'r' + x1 + 'c' + y
        let pid1 = board[cellId1].pid
        if (pid1.length > 0) {
            // blocked!
        } else {
            possible[cellId1] = {result:INFLUENCE, type:NORMAL}
            let x2 = pawn.x + ( pawn.move * 2 )
            if (isOnboard(x2, y) && pawn.moveCount == 0 ) {
                let cellId2 = 'r' + x2 + 'c' + y
                let pid2 = board[cellId2].pid
                if (pid2.length > 0) {
                    // blocked!
                } else {
                    possible[cellId2] = {result:INFLUENCE, type:PAWN_MOVED_TWICE}
                }
            }
        }
    }
}

const pawnMove = (cellId, pawn) => {
    pawn_movement(pawn)
    pawn_attack(pawn)
    pawn_enpassant(pawn)
    for (let cellId in possible) {
        document.getElementById(cellId).style.backgroundColor = possible[cellId].result
    }
}
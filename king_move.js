const white_backrank = {
    'r7c0':'r7c0',
    'r7c1':'r7c1',
    'r7c2':'r7c2',
    'r7c3':'r7c3',
    'r7c4':'r7c4',
    'r7c5':'r7c5',
    'r7c6':'r7c6',
    'r7c7':'r7c7'
}

const black_backrank = {
    'r0c0':'r0c0',
    'r0c1':'r0c1',
    'r0c2':'r0c2',
    'r0c3':'r0c3',
    'r0c4':'r0c4',
    'r0c5':'r0c5',
    'r0c6':'r0c6',
    'r0c7':'r0c7'
}

const doCastling = (cellId) => {
    if ( cellId == 'r7c6') {


        
        pieces['wr2'].moveCount++
        pieces['wr2'].boardId = 'r7c5'
        board['r7c7'].pid = ''
        board['r7c5'].pid = pieces['wr2'].id
        document.getElementById("r7c7").innerHTML = ""
        document.getElementById("r7c5").innerHTML = pieces['wr2'].html
        pieces['wr2'].x = 7
        pieces['wr2'].y = 5

    } else if ( cellId == 'r7c2') {
        pieces['wr1'].moveCount++
        pieces['wr1'].boardId = 'r7c3'
        board['r7c0'].pid = ''
        board['r7c3'].pid = pieces['wr1'].id
        document.getElementById("r7c0").innerHTML = ""
        document.getElementById("r7c3").innerHTML = pieces['wr1'].html
        pieces['wr1'].x = 7
        pieces['wr1'].y = 3

    } else if ( cellId == 'r0c6') {
        pieces['br2'].moveCount++
        pieces['br2'].boardId = 'r0c5'
        board['r0c7'].pid = ''
        board['r0c5'].pid = pieces['br2'].id
        document.getElementById("r0c7").innerHTML = ""
        document.getElementById("r0c5").innerHTML = pieces['br2'].html
        pieces['br2'].x = 0
        pieces['br2'].y = 5
    } else if ( cellId == 'r0c2') {
        pieces['br1'].moveCount++
        pieces['br1'].boardId = 'r0c3'
        board['r0c0'].pid = ''
        board['r0c3'].pid = pieces['br1'].id
        document.getElementById("r0c0").innerHTML = ""
        document.getElementById("r0c3").innerHTML = pieces['br1'].html
        pieces['br1'].x = 0
        pieces['br1'].y = 3
    }
} 

const determineIfCastleIsPossible=(king)=> {
    if ( king.moveCount == 0 ) {
        if ( king.id == 'wk') {
            // white king side castle
            let isOk1 = true
            isOk1 =  board['r7c5'].pid > 0 ? false : isOk1
            isOk1 =  board['r7c6'].pid > 0 ? false : isOk1
            isOk1 =  board['r7c7'].pid > 0 ? false : isOk1
            isOk1 =  pieces['wr2'].moveCount == 0 ? isOk1 : false
            if ( isOk1 ) {
                possible['r7c6'] = {result:INFLUENCE, type:CASTLE}
            }
            // white queen side castle
            let isOk2 = true
            isOk2 =  board['r7c1'].pid > 0 ? false : isOk2
            isOk2 =  board['r7c2'].pid > 0 ? false : isOk2
            isOk2 =  board['r7c3'].pid > 0 ? false : isOk2
            isOk2 =  pieces['wr1'].moveCount == 0 ? isOk2 : false
            if ( isOk2 ) {
                possible['r7c2'] = {result:INFLUENCE, type:CASTLE}
            }
        } else if ( king.id == 'bk') {
            // black king side castle
            let isOk1 = true
            isOk1 =  board['r0c5'].pid > 0 ? false : isOk1
            isOk1 =  board['r0c6'].pid > 0 ? false : isOk1
            isOk1 =  board['r0c7'].pid > 0 ? false : isOk1
            isOk1 =  pieces['br2'].moveCount == 0 ? isOk1 : false
            if ( isOk1 ) {
                possible['r0c6'] = {result:INFLUENCE, type:CASTLE}
            }
            // black queen side castle
            let isOk2 = true
            isOk2 =  board['r0c1'].pid > 0 ? false : isOk2
            isOk2 =  board['r0c2'].pid > 0 ? false : isOk2
            isOk2 =  board['r0c3'].pid > 0 ? false : isOk2
            isOk2 =  pieces['br1'].moveCount == 0 ? isOk2 : false
            if ( isOk2 ) {
                possible['r0c2'] = {result:INFLUENCE, type:CASTLE}
            }
        }
    }
}
const kingMove = ( p) => { 
    determineIfCastleIsPossible(p)
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
  
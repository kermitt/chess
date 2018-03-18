const castle=(king)=> {

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
console.log("km")
    castle(p)
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
  
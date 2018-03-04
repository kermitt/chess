function touch(id) {
    for ( let key in board ) {
        let domId = board[key].id
        document.getElementById(domId).classList.remove("possible");
    }
    let p = pieces[id]
    p.moves.forEach((xy,j)=>{
        let col = p.column
        let row = p.row
        let i = 0
        let keepAlive = true
        while ( i < p.travel && keepAlive) {
            i++
                col += xy[0]
                row += xy[1]
                id = "c" + col + "r" + row

                if ( col > -1 && col < 8 && row > -1 && row < 8 ) {
                        let domId = board[id].id
                    document.getElementById(domId).classList.add("possible");
                } else {
                }
        }
    })
}
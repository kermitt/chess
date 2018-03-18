const TOUCH = "#f00fff"
const PLAY_MODE = "mode: play"
const EXPLORE_MODE = "mode: explore"
let CURRENT_MODE = PLAY_MODE
function setMode() {
    if ( CURRENT_MODE == PLAY_MODE ) {
        CURRENT_MODE = EXPLORE_MODE
        document.getElementById("remove_selected").style.display = "inline"
        document.getElementById("turn").style.display = "none"
    } else {
        CURRENT_MODE = PLAY_MODE
        document.getElementById("remove_selected").style.display = "none"
        document.getElementById("turn").style.display = "inline"
    }
    document.getElementById("mode").innerHTML = CURRENT_MODE
}

function show_white_influences() {
    resetAllCells()
    const influences = getAllInfluences()
    const influence = influences['white']
    for ( let cellId in influence ) {
        if ( influence[cellId]['INFLUENCE'] > 0 ) {
            document.getElementById(cellId).style.backgroundColor = INFLUENCE            
        } else if ( influence[cellId]['SUPPORT'] > 0 ) {
        //    document.getElementById(cellId).style.backgroundColor = TOUCH
        } else if ( influence[cellId]['ATTACK'] > 0 ) {
            document.getElementById(cellId).style.backgroundColor = TOUCH
        }
    } 
}

function show_black_influences() {
    resetAllCells()
    const influences = getAllInfluences()
    const influence = influences['black']
    for ( let cellId in influence ) {
        if ( influence[cellId]['INFLUENCE'] > 0 ) {
            document.getElementById(cellId).style.backgroundColor = INFLUENCE            
        } else if ( influence[cellId]['SUPPORT'] > 0 ) {
        //    document.getElementById(cellId).style.backgroundColor = TOUCH
        } else if ( influence[cellId]['ATTACK'] > 0 ) {
            document.getElementById(cellId).style.backgroundColor = TOUCH
        }
    }
}

const getAllInfluences = () => { 
    let influence_black = {}
    let influence_white = {}
    
    for (let id in pieces ) { 
        let piece = pieces[id]
        if ( ! piece.isDead ) {
            if ( piece.color == WHITE) {
                getResults(piece, influence_white)
            } else { 
                getResults(piece, influence_black)
            }
        }
    }
    resetAllCells()
    return {'black':influence_black, 'white':influence_white}
}
const getResults = (piece, influence) => {
    possible = {}
    if ( piece.id.startsWith("wp") || piece.id.startsWith("bp")) {
        pawnMove( piece)
    } else if ( piece.id == "wk" || piece.id == "bk") {
        kingMove( piece)
    } else {
        possibleMoves(piece)
    } 
    for ( let cellId in possible ) {
        if ( ! influence.hasOwnProperty(cellId)) { 
            influence[cellId] = {'ATTACK':0,'INFLUENCE':0,'SUPPORT':0}
        }
        if ( possible[cellId].result == SUPPORT ) {
        //    influence[cellId]['SUPPORT']++
        } else if ( possible[cellId].result == ATTACK ) {
            influence[cellId]['ATTACK']++
        } else if ( possible[cellId].result == INFLUENCE ) {
            if ( ! piece.isPawn ) {
                influence[cellId]['INFLUENCE']++      
            } 
        }
    }
}



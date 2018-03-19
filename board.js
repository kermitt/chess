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

const len=(map)=> {
    let i = 0
    for ( let k in map) { 
        i++
    }
    return i
}

function show_white_influences() {
    resetAllCells()
    for ( let cellId in board ) {
        let cell = board[cellId].cell
        if ( len(cell.records) > 0 ) {
            console.log( cellId + "   " +  JSON.stringify(cell.records,null, 6))

            let r2 = cell.records.result
            let iro = "#000000"
            if ( r2 == "INFLUENCE") {
                iro = "#0000ff"
            } else if ( r2 == "SUPPORT") {
                iro = "#0000ff"
            }

            document.getElementById(cellId).style.backgroundColor = iro



        }
    }
}

function show_black_influences() {
}
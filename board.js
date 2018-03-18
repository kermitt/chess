


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
let influence_black = {}
let influence_white = {}

function show_all_influences() { 

    for (let id in pieces ) { 
        let p = pieces[id]
        if ( ! p.isDead ) {

        }

    }

}



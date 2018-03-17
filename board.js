


let play_mode = "mode: play"
let explore_mode = "mode: explore"
let current_mode = play_mode
function setMode() {
    if ( current_mode == play_mode ) {
        current_mode = explore_mode
        document.getElementById("remove_selected").style.display = "inline"
    } else {
        current_mode = play_mode
        document.getElementById("remove_selected").style.display = "none"
    }
    document.getElementById("mode").innerHTML = current_mode
}
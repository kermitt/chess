// Run this to generate the base board...
// This file is not part of the real game
// Once I settle on a board.html then I will throw this file away.

const BLACK_CELL = 'cell_black'
const WHITE_CELL = 'cell_white'
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const l = (x) => {
  console.log(x)
}
l('<!-- The below was generated by the script help.js //-->')
l('<html>\n<head>')
l('<link rel="stylesheet" type="text/css" href="style.css">')
l('</head>')
l('<body>')
//l('<span id="turn"></span><button id="mode" onclick="setMode();">Mode</button>')
l('<button id="turn"></button><button id="mode" onclick="setMode();">mode: play</button><button id="remove_selected" onclick="remove_selected();">remove: selected</button><button onclick="show_black_influences();">show: black</button><button onclick="show_white_influences();">show: white</button>')

l('<table border="1"><tr><td valign="top">')

l('<table border="1">')
let cell_color_flipflop = 1
let board = {}

for (let row = 0; row < 8; row++) {
  l('\n<tr>')
  for (let col = 0;col < 8; col++) {
    let number = 8 - row // flip! bottom row is 1! Not the highest.
    let human = letters[col] + number
    let css = cell_color_flipflop % 2 == 0 ? BLACK_CELL : WHITE_CELL
    let rc = 'r' + row + 'c' + col
    //l("<td valign='center'><div id='" + rc + "' class='" + css + "'   onclick='cell_click(\"" + human + '","' + rc + "\")'>" + rc + "</div></td>")
    l("<td valign='center'><div id='" + rc + "' class='" + css + "'   onclick='cell_click(\"" + human + '","' + rc + "\")'></div></td>")
    cell_color_flipflop++
    board[rc] = {human:human, pid: '', influenced: {}, css: css, rc:rc }
  }
  cell_color_flipflop++
  l('</tr>')
}
l('</table></td><td valign="top"><div id="dead"></div></td><td valign="top"><div id="pgn"></div></td></tr></table>')
l('<div id="active_piece"></div>')
l('<script>')
l('let board=' + JSON.stringify(board, null, 6))
l('</script>')
l('<script src="pieces.js"></script>') // pieces
l('<script src="board.js"></script>') // stuff
l('<script src="logic.js"></script>') // move logic
l('<script src="pgn.js"></script>') // pgn stuff : TODO = everything pgn
l('<!-- Pawns and Kings have weird movement, hence breakout to a diff file //-->')
l('<script src="pawn_move.js"></script>') // pawn move logic ( tricky )
l('<script src="king_move.js"></script>') // king move logic ( tricky )
l('</body>')
l('</html>')

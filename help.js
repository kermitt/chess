// Run this to generate the base board...
// This file is not part of the real game

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
//l('<hr>')
l('<div id="turn"></div>')
l('<table border="1"><tr><td valign="top">')

l('<table border="1">')
let cell_color_flipflop = 1
let board = {}
//let lookup = {}

for (let row = 0; row < 8; row++) {
  l('\n<tr>')

for (let col = 0;col < 8; col++) {
//  l('\n<tr>')
//  for (let row = 0; row < 8; row++) {
    let number = 8 - row // flip! bottom row is 1! Not the highest.
    let human = letters[col] + number
    let css = cell_color_flipflop % 2 == 0 ? BLACK_CELL : WHITE_CELL
    let rc = 'r' + row + 'c' + col
 //   l("<td valign='center'><div id='" + rc + "' class='" + css + "'   onclick='cell_click(\"" + human + '","' + rc + "\")'>" + rc + "</div></td>")
    l("<td valign='center'><div id='" + rc + "' class='" + css + "'   onclick='cell_click(\"" + human + '","' + rc + "\")'></div></td>")
    cell_color_flipflop++
    board[rc] = {human:human, pid: '', influenced: {}, css: css, rc:rc}
//    lookup[human] = rc
  }
  cell_color_flipflop++
  l('</tr>')
}
//l('</table></td><td valign="top"><div id="dead">d</div></td><td valign="top"><textarea class="forHumans" id="pgn" rows="30" cols="100"></textarea></td></tr></table>')
l('</table></td><td valign="top"><div id="dead"></div></td><td valign="top"><div id="pgn"></div></td></tr></table>')
l('<div id="active_piece"></div>')
l('<script>')
l('let board=' + JSON.stringify(board, null, 6))
//l('let lookup=' + JSON.stringify(lookup, null, 6))
l('</script>')
l('<script src="pieces.js"></script>')
l('<script src="logic.js"></script>')
l('<script src="pgn.js"></script>')
l('<!-- Pawns and Kings have weird movement, hence breakout to a diff file //-->')
l('<script src="pawn_move.js"></script>')
l('<script src="king_move.js"></script>')
l('</body>')
l('</html>')

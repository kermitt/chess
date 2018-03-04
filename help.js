// Run this to generate the base board...
// This file is not part of the real game

const BLACK_CELL = 'cell_black'
const WHITE_CELL = 'cell_white'
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const l = (x) => {
  console.log(x)
}
l('<body>')
l('<table border="1">')
let cell_color_flipflop = 1
//let lookup = {}
let board = {} 
for (let i = 0; i < 8; i++) {
  l('\n<tr>')

  for (let j = 0; j < 8; j++) {
    let number = 8 - j // flip
    let id = letters[i] + number
    let css = cell_color_flipflop % 2 == 0 ? BLACK_CELL : WHITE_CELL
    l("<td valign='center'><div id='" + id + "' class='" + css + "'>" + cell_color_flipflop + '</div></td>')
    cell_color_flipflop++
    let rowcol = 'c' + i + 'r' + j

    board[rowcol] = {id:id, p:""}
  }
  cell_color_flipflop++
  l('</tr>')
}
l('</table>')
l('<script>')

l('let board=' + JSON.stringify(board,null,6))

l('</script>')
l('<script src="pieces.js"></script>')
l('<script src="logic.js"></script>')
l('</body>')
l('</html>')

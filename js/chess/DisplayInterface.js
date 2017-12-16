/* D3 stuff is hard to TDD/Unit-test...  ...This file hold only D3 things.
There is a sister file to this, 'DisplayLogic.js' which is the companion to
this one. I've split this and that into two in order to be able to more easily
test that one. */

function snapto (piece, x, y) {
  board.findClosestLegalCell(x, y, size)
  let cellId = board.findClosestLegalCell(x, y, size)
  if (cellId.length > 0) {
    piece.x = board.getXLocation(cellId)
    piece.y = board.getYLocation(cellId)
    piece.cellId = cellId
    d3.select('#' + piece.key)
    .data([{'x': piece.x, 'y': piece.y}])
    .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')
  } else {
    d3.select('#' + piece.key)
    .data([{'x': piece.x, 'y': piece.y}])
    .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')
  }
}

let drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
    })
    .on('dragstart', function (d, i) {
      let piece = pieces.pieces[this.id]
      findPossibleMoves(piece)
      toggleInfluenceDisplay()
    })
    .on('dragend', function (d, i) {
      let piece = pieces.pieces[this.id]
      snapto(piece, d.x, d.y)
      board.zeroOutInfluences()
      toggleInfluenceDisplay()
    })

function toggleInfluenceDisplay () {
  board.board.forEach((row) => {
    row.forEach((cell) => {
      d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
    })
  })
}

function addCell (cell) {
  let c = d3.select('#chessboard')
        .append('svg:g')
        .attr('transform', 'translate(' + cell.x + ',' + cell.y + ')')

  let background = c.append('svg:rect')
        .attr('id', cell.id)
        .attr('fill', cell.color)
        .attr('fill-opacity', 1.0)
        .attr('stroke-width', 4)
        .attr('width', size)
        .attr('height', size)

  let text = c.append('svg:text')
        .text(function (d) {
          let ary = cell.id.split('_')
          let ignore = ary[0]
          let column = ary[1]
          let row = ary[2]
          return column + '  ' + row
        })
        .attr('transform', 'translate(' + [(size - 10) / 2, (size + 12) / 2] + ')')
        .attr('text-anchor', 'right')
        .attr('font-weight', 700)
        .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
}
function addPieceIntoDom (piece) {
  let r = size / 3
  let p = d3.select('#chessboard')
        .append('svg:g')
        .data([{
          'x': piece.x,
          'y': piece.y
        }]) // needed for dragging
        .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')
        .attr('id', piece.key)
        .call(drag)

  let background = p.append('svg:circle')
        .attr('fill-opacity', 0.1)
        .attr('stroke', '#000')
        .attr('stroke-width', 4)
        .attr('r', r)
  let foreground = p.append('svg:text')
        .text(piece.unicode)
        .attr('y', '.1em')
        .style('font-size', 40)
        .attr('transform', 'translate(' + [0, r / 3] + ')')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 700)
        .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
}

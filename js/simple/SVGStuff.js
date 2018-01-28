
function svg_toggleInfluenceDisplay () {
  board.board.forEach((row) => {
    row.forEach((cell) => {
      d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
      d3.select('#' + cell.id).classed('attackable', cell.isAttacked)
      d3.select('#' + cell.id).classed('supported', cell.isSupported)
    })
  })
}

function svg_snapto (piece, x, y) {
  svg_toggleInfluenceDisplay()
  board.findClosestLegalCell(x, y)
  let cell = board.findClosestLegalCell(x, y)
  piece.x = cell.px
  piece.y = cell.py

  d3.select('#' + piece.id)
    .data([{'x': piece.x, 'y': piece.y}])
    .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')
}

let svg_drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
    })
    .on('dragstart', function (d, i) {
      let piece = pieces[this.id]
      // svg_findPossibleMoves(piece)
      // for ( let i = 0 ; i < piece.possibleSpaces; i++ ) {

      let gpmc = piece.getPossibleMovesCount()
      let gpm = piece.getPossibleMoves()
      console.log(gpmc + ' and ' + gpm)
    })
    .on('dragend', function (d, i) {
      let piece = pieces[this.id]
      svg_snapto(piece, d.x, d.y)
      // board.zeroOutInfluences()
      // toggleInfluenceDisplay()
    })

function svg_addCell (cell) {
  let c = d3.select('#chessboard')
        .append('svg:g')
        .attr('transform', 'translate(' + cell.x + ',' + cell.y + ')')

  let background = c.append('svg:rect')
        .attr('id', cell.id)
        .attr('fill', cell.color)
        .attr('fill-opacity', 1.0)
        .attr('stroke-width', 4)
        .attr('width', SIZE)
        .attr('height', SIZE)

        /// / TODO: REMOVE THE BELOW TEXT

  let down = -40
  // id
  c.append('svg:text')
        .text('id: ' + cell.id)
        .attr('transform', 'translate(' + [(SIZE - 30) / 2, (SIZE + down) / 2] + ')')
        .attr('text-anchor', 'right')
        .attr('font-weight', 700)
        .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
/*
  down += 30
  // x
  c.append('svg:text')
        .text('x: ' + cell.x)
        .attr('transform', 'translate(' + [(SIZE - 30) / 2, (SIZE + down) / 2] + ')')
        .attr('text-anchor', 'right')
          .attr('font-weight', 700)
          .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')

  down += 30
    // y
  c.append('svg:text')
        .text('y: ' + cell.y)
        .attr('transform', 'translate(' + [(SIZE - 30) / 2, (SIZE + down) / 2] + ')')
        .attr('text-anchor', 'right')
          .attr('font-weight', 700)
          .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
*/
        // COLUMN
  down += 30

  c.append('svg:text')
        .text('c: ' + cell.col)
        .attr('transform', 'translate(' + [(SIZE - 30) / 2, (SIZE + down) / 2] + ')')
        .attr('text-anchor', 'right')
          .attr('font-weight', 700)
          .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')

        // ROW
  down += 30

  c.append('svg:text')
        .text('r: ' + cell.row)
        .attr('transform', 'translate(' + [(SIZE - 30) / 2, (SIZE + down) / 2] + ')')
        .attr('text-anchor', 'right')
          .attr('font-weight', 700)
          .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
}

function svg_addPieceIntoDom (piece, size) {
  // console.log(JSON.stringify(piece, null, 6) + ' \n ***** ')

  let r = SIZE / 3
  let p = d3.select('#chessboard')
        .append('svg:g')
        .data([{
          'x': piece.x,
          'y': piece.y,
          'id': piece.id
        }]) // needed for dragging
        .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')
        .attr('id', piece.id)
        .call(svg_drag)

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

function svg_addPieceIntoDom (piece, size) {
  // console.log(JSON.stringify(piece, null, 6) + ' \n ***** ')

  let r = SIZE / 3
  let p = d3.select('#chessboard')
        .append('svg:g')
        .data([{
          'x': piece.x,
          'y': piece.y,
          'id': piece.id
        }]) // needed for dragging
        .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')
        .attr('id', piece.id)
        .call(svg_drag)

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

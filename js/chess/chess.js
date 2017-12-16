let w = 800
let h = 800
let size = w / 8
let id2cell = {}
let board = new Board()
let pieces = new Pieces()
let moves = new Moves()

function snapto (p, x, y) {
  board.findClosestLegalCell(x, y, size)
  let cellId = board.findClosestLegalCell(x, y, size)
  if (cellId.length > 0) {
    p.x = board.getXLocation(cellId)
    p.y = board.getYLocation(cellId)
    p.cellId = cellId
    d3.select('#' + p.key).data([{'x': p.x, 'y': p.y}]).attr('transform', 'translate(' + p.x + ',' + p.y + ')')
  } else {
    d3.select('#' + p.key).data([{'x': p.x, 'y': p.y}]).attr('transform', 'translate(' + p.x + ',' + p.y + ')')
  }
}

let drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
    })
    .on('dragstart', function (d, i) {
      board.zeroOutInfluences()
      let p = pieces.pieces[this.id]
      let LoL_influences = moves.getPossibleMoves(p.key, p.moveCount)

      LoL_influences.forEach(potential_col_row => {
        let col_row = moves.getColumnRow_viaRelativeLookup(p.cellId, potential_col_row)

        console.log('p.cellId ' + p.cellId + '    and ' + col_row + '  cellId ' + p.cellId + ' this.di ' + this.id)

        try {
          if (col_row != undefined) {
            let c = col_row[0]
            let r = col_row[1]
            board.setInfluenced(c, r)
            console.log('board column ' + c + '   row ' + row)
          }
        } catch (ignore) {
          // console.log('Do not setInfluenced on ' + col_row)
        }
      })
      board.board.forEach((row) => {
        row.forEach((cell) => {
          d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
        })
      })
    })
    .on('dragend', function (d, i) {
      let p = pieces.pieces[this.id]
      snapto(p, d.x, d.y)
      board.zeroOutInfluences()

      board.board.forEach((row) => {
        row.forEach((cell) => {
          d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
        })
      })
    })

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

function main () {
  board.setEveryCellLocations(size)

  board.board.forEach(row => {
    row.forEach(cell => {
      addCell(cell)
    })
  })
  for (let key in pieces.pieces) {
    // console.log(key)
    let p = pieces.pieces[key]
    let x = board.getXLocation(p.cellId)
    let y = board.getYLocation(p.cellId)
    p.setXLocation(x)
    p.setYLocation(y)
    addPieceIntoDom(p)
  }
}
main()

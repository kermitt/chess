
function svg_toggleInfluenceDisplay () {
  for (let id in board.cells) {
    let cell = board.cells[id]
    d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
    d3.select('#' + cell.id).classed('attackable', cell.isAttacked)
    d3.select('#' + cell.id).classed('supported', cell.isSupported)
  }
}

function svg_zerooutInfluence () {
  /*
  board.board.forEach((row) => {
    row.forEach((cell) => {
      d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
      d3.select('#' + cell.id).classed('attackable', cell.isAttacked)
      d3.select('#' + cell.id).classed('supported', cell.isSupported)
    })
  })
  */
  console.log('ONE! ')

  for (let id in board.cells) {
    let cell = board.cells[id]
    cell.isInfluenced = false
    cell.isAttacked = false
    cell.isSupported = false
    d3.select('#' + cell.id).classed('influenced', cell.isInfluenced)
    d3.select('#' + cell.id).classed('attackable', cell.isAttacked)
    d3.select('#' + cell.id).classed('supported', cell.isSupported)
  }
}

function influence (pieceColor, col, row, vectorY, vectorX, pieces_whichCell_whichColor, possibleMoveCount, currentMoveCount) {
  currentMoveCount++
  if (currentMoveCount <= possibleMoveCount) {
    let potential = board.board[col][row]
    if (potential != undefined) {
      let c = col + vectorY
      let r = row + vectorX
      if (c < 8 && c >= 0 && r < 8 && r >= 0) {
        let cellId = 'cr_' + c + '_' + r
        let hit = pieces_whichCell_whichColor.hasOwnProperty(cellId)
        if (hit === true) {
          let otherPieceColor = pieces_whichCell_whichColor[cellId]
          if (pieceColor != otherPieceColor) {
            board.setIsAttacked(c, r)
            board.setInfluenced(c, r)
          } else {
            board.setIsSupported(c, r)
          }
        } else {
          board.setInfluenced(c, r)
        }
        if (!pieces_whichCell_whichColor.hasOwnProperty(cellId)) {
          this.influence(pieceColor, c, r, vectorY, vectorX, pieces_whichCell_whichColor, possibleMoveCount, currentMoveCount)
        }
      }
    }
  }
}

function paintInfluence (piece) {
  let n = piece.getTravel()
  let r = piece.row
  let c = piece.column
  piece.moves.forEach((possible, i) => {
    let col = c
    let row = r
    let notBlocked = true
    for (let j = 0; j < n; j++) {
      col += possible[0]
      row += possible[1]
      if (col >= 0 && row >= 0 && col <= 7 && row <= 7 && notBlocked) {
        let cid = getCellId_fromColumnAndRow(col, row)
        let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
        if (pid == undefined) {
          console.log('No. It does not.')
          board.cells[cid].isInfluenced = true
          d3.select('#' + cid).classed('influenced', board.cells[cid].isInfluenced)
        } else {
          if (pieces[pid].color == piece.color) {
            board.cells[cid].isSupported = true
            d3.select('#' + cid).classed('supported', board.cells[cid].isSupported)
          } else {
            board.cells[cid].isAttacked = true
            d3.select('#' + cid).classed('attackable', board.cells[cid].isAttacked)
          }
        }
      }
    }
  })
}

function svg_snapto (piece, mouseX, mouseY) {
  let cell = board.findClosestLegalCell(mouseX, mouseY)
  if (cell.isAttacked || cell.isInfluenced) {
    piece.x = cell.px
    piece.y = cell.py
    piece.row = cell.row
    piece.column = cell.column
  } else {
    let origCellId = getCellId_fromColumnAndRow(piece.column, piece.row)
    piece.x = board.cells[origCellId].px
    piece.y = board.cells[origCellId].py
  }

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

      paintInfluence(piece)
    })
    .on('dragend', function (d, i) {
      let piece = pieces[this.id]
      svg_snapto(piece, d.x, d.y)
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
  down += 30

  c.append('svg:text')
        .text('c: ' + cell.column)
        .attr('transform', 'translate(' + [(SIZE - 30) / 2, (SIZE + down) / 2] + ')')
        .attr('text-anchor', 'right')
          .attr('font-weight', 700)
          .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')

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
        .on('click', function () {
          console.log('CLICK!')
        })

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

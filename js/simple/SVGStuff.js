
function svg_zerooutInfluence () {
  for (let id in board.cells) {
    board.cells[id].isInfluenced = false
    board.cells[id].isAttacked = false
    board.cells[id].isSupported = false
    d3.select('#' + id).classed('influenced', false)
    d3.select('#' + id).classed('attackable', false)
    d3.select('#' + id).classed('supported', false)
    d3.select('#' + id).classed('enpassant', false)
  }
}

function svg_paintInfluence_forPawn (pawn) {
  let r = pawn.row
  let c = pawn.column
  let notBlocked = true
  pawn.sussPossiblePawnMoves()
  pawn.sussPossiblePawnAttackMoves()
  for (let key in pawn.moves) {
    let col_row = pawn.moves[key]
    let col = col_row[0]
    let row = col_row[1]
    if (isOnTheBoard(col, row) && notBlocked) {
      let cid = getCellId_fromColumnAndRow(col, row)
      let pid = board.cells[cid].getPieceId()
      if (pid == undefined) {
        board.cells[cid].isInfluenced = true
        d3.select('#' + cid).classed('influenced', board.cells[cid].isInfluenced)
      }
    }
  }

  for (let key in pawn.attacks) {
    let col_row = pawn.attacks[key]
    let col = col_row[0]
    let row = col_row[1]
    if (isOnTheBoard(col, row) && notBlocked) {
      let cid = getCellId_fromColumnAndRow(col, row)
      if (key.includes('attack')) {
        board.cells[cid].isAttacked = true
        d3.select('#' + cid).classed('attackable', board.cells[cid].isAttacked)
      } else {
        board.cells[cid].isSupported = true
        d3.select('#' + cid).classed('supported', board.cells[cid].isSupported)
      }
    }
  }

  pawn.kill_and_land.forEach((ary) => {
    let cid = ary[1]
    board.cells[cid].isEnpassant = true
    d3.select('#' + cid).classed('enpassant', board.cells[cid].isEnpassant)
    console.log(cid + '  kill ' + ary[0])
  })
}

function svg_snapto_forPawn (pawn, mouseX, mouseY) {
  let cell = board.findClosestLegalCell(mouseX, mouseY)

  let origCellId = getCellId_fromColumnAndRow(pawn.column, pawn.row)
  let origCell = board.cells[origCellId]

  if (cell.isAttacked || cell.isInfluenced || cell.isEnpassant) {
    pawn.x = cell.px
    pawn.y = cell.py
    pawn.row = cell.row
    pawn.column = cell.column
    origCell.removePiece()
    if (cell.isAttacked) {
      svg_killPiece_and_place_into_the_deadpieces_bin(cell)
    } else if (cell.isEnpassant) {
      pawn.kill_and_land.forEach((ary) => {
        if (cell.id == ary[1]) {
          let kill = ary[0]
          cell.setPiece(pawn)
          console.log('KILL ' + kill)
          svg_killPiece_and_place_into_the_deadpieces_bin(board.cells[kill])
          board.cells[kill].removePiece()
        }
      })
    } else {
    }

    cell.setPiece(pawn)
    pawn.moveCount++
    board.moveCount++
    pawn.reset()
  } else {
    let origCellId = getCellId_fromColumnAndRow(pawn.column, pawn.row)
    pawn.x = origCell.px
    pawn.y = origCell.py
  }

  pawn.moves = {}
  pawn.attacks = {}

  d3.select('#' + pawn.id)
    .data([{'x': pawn.x, 'y': pawn.y}])
    .attr('transform', 'translate(' + pawn.x + ',' + pawn.y + ')')

  svg_zerooutInfluence()
}

function svg_paintInfluence (piece) {
  let n = piece.getTravel()
  let r = piece.row
  let c = piece.column

    /// Everything else is easy-peasy
  piece.moves.forEach((possible, i) => {
    let col = c
    let row = r
    let notBlocked = true
    for (let j = 0; j < n; j++) {
      col += possible[0]
      row += possible[1]
      if (isOnTheBoard(col, row) && notBlocked) {
        let cid = getCellId_fromColumnAndRow(col, row)
        let pid = board.cells[cid].getPieceId() // Does this cell have a piece already on it?
        if (pid == undefined) {
          board.cells[cid].isInfluenced = true
          d3.select('#' + cid).classed('influenced', board.cells[cid].isInfluenced)
        } else {
          if (pieces[pid].color == piece.color) {
            notBlocked = false
            board.cells[cid].isSupported = true
            d3.select('#' + cid).classed('supported', board.cells[cid].isSupported)
          } else {
            notBlocked = false
            board.cells[cid].isAttacked = true
            d3.select('#' + cid).classed('attackable', board.cells[cid].isAttacked)
          }
        }
      }
    }
  })
}

function svg_killPiece_and_place_into_the_deadpieces_bin (cell) {
  let pieceId = cell.pieceId
  let unicode = pieces[pieceId].unicode
  d3.select('#' + pieceId).remove()

  document.getElementById('deadpieces').innerHTML += unicode + '<br/>'
}

function svg_snapto (piece, mouseX, mouseY) {
  let cell = board.findClosestLegalCell(mouseX, mouseY)

  let origCellId = getCellId_fromColumnAndRow(piece.column, piece.row)
  let origCell = board.cells[origCellId]

  if (cell.isAttacked || cell.isInfluenced) {
    piece.x = cell.px
    piece.y = cell.py
    piece.row = cell.row
    piece.column = cell.column
    origCell.removePiece()
    if (cell.isAttacked) {
      svg_killPiece_and_place_into_the_deadpieces_bin(cell)
    }
    cell.setPiece(piece)
    piece.moveCount++
    board.moveCount++
  } else {
    let origCellId = getCellId_fromColumnAndRow(piece.column, piece.row)
    piece.x = origCell.px
    piece.y = origCell.py
  }

  d3.select('#' + piece.id)
    .data([{'x': piece.x, 'y': piece.y}])
    .attr('transform', 'translate(' + piece.x + ',' + piece.y + ')')

  svg_zerooutInfluence()
}

let svg_drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
    })
    .on('dragstart', function (d, i) {
      let piece = pieces[this.id]
      if (isPawn(piece.name)) {
        svg_paintInfluence_forPawn(piece)
      } else {
        svg_paintInfluence(piece)
      }
    })
    .on('dragend', function (d, i) {
      let piece = pieces[this.id]
      if (isPawn(piece.name)) {
        console.log('PAWN SNAP')
        svg_snapto_forPawn(piece, d.x, d.y)
      } else {
        svg_snapto(piece, d.x, d.y)
      }
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
        .text(cell.id)
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

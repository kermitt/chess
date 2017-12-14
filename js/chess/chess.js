let w = 800
let h = 800
let size = w / 9
let id2cell = {}

function flip (possibleMoves, currentCellId) {
  for (let key in id2cell) {
    d3.select('#id' + key).classed('yay', false)
  }

  for (let key in possibleMoves) {
    let cellId = '#id' + (currentCellId - key)

    try {
      d3.select(cellId).attr('class', 'yay')
    // console.log('id#' + key + '   mod: ' + (currentCellId - key))
    } catch (boom) {
      console.log('FAIL! |' + cellId + '|')
      console.log('ACK! ' + boom)
    }

//    d3.select('#id6').attr('class', 'yay')  // .attr('height', 2)
  }

//  d3.select('#id6').classed('yay', what)  // .attr('height', 2)
//  console.log('SET TO ' + what)
}

let drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      // console.log('x!! ' + d.x)
      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
    })
    .on('dragstart', function (d, i) {
      let p = pieces[this.id]
      // console.log('ID: ' + p.id + '   cell ' + p.cellId)
      let possible = Moves.getPossibleMoves(p.key, p.moveCount)
      flip(possible, p.cellId)
    })
    .on('dragend', function (d, i) {
  //    console.log('stopping drag fro ' + this.id)
    })
function populate () {
  // the letters and numbers bordering the actual boards
  d3.json('js/chess/border.json', function (LoH) {
    LoH.forEach((cell) => {
      cell.x = cell.col * size
      cell.y = cell.row * size
      addCell(cell)
    })
  })

  d3.json('js/chess/board.json', function (LoH) {
    LoH.forEach((cell, i) => {
      cell.x = cell.col * size
      cell.y = cell.row * size
      cell.cx = cell.x + (size / 2)
      cell.cy = cell.y + (size / 2)
      id2cell[cell.i] = cell
      addCell(cell)

      if (i == 63) {
        for (let key in pieces) {
          pieces[key].x = id2cell[pieces[key].cellId].x + (size / 2)
          pieces[key].y = id2cell[pieces[key].cellId].y + (size / 2)
          addPiece(pieces[key])
        }
      }
    })
  })
}
populate()

function addPiece (piece) {
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
        .attr('class', 'cssthing')
        .attr('fill', function (d) {
          return '#e0e0e0'
        })
        .attr('fill-opacity', 0.1)
        .attr('stroke', '#000')
        .attr('stroke-width', 4)
        .attr('r', r)
  let foreground = p.append('svg:text')
        .text(piece.unicode)
//        .text(piece.key)
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

function addCell (obj) {
  let x = obj.x// col * size
  let y = obj.y// row * size

  let c = d3.select('#chessboard')
        .append('svg:g')
        .attr('transform', 'translate(' + x + ',' + y + ')')

  let main = c.append('svg:rect')
        .attr('id', obj.id)
        .attr('fill', obj.color)
        .attr('fill-opacity', 1.0)
        .attr('stroke-width', 4)
        .attr('width', size)
        .attr('height', size)

  let show_to_the_humans = obj.i
  if (obj.piece == 'border') {
    show_to_the_humans = obj.i
  }

  let text = c.append('svg:text')
        .text(show_to_the_humans)
        .attr('transform', 'translate(' + [(size - 10) / 2, (size + 12) / 2] + ')')
        .attr('text-anchor', 'right')
        .attr('font-weight', 700)
        .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
}

let what = false
function doSomething () {
  what = !what
  d3.select('#id6').classed('yay', what)  // .attr('height', 2)
  console.log('SET TO ' + what)

// d3.select('#id6').attr('class', 'yay')  // .attr('height', 2)
}

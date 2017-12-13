let drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      d3.select(this).attr('transform', function (d, i) {
        return 'translate(' + [d.x, d.y] + ')'
      })
    })

let w = 800
let h = 800
let size = w / 9
d3.select('body')
    .append('svg:svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'charts')
    // .on("click", clickypie)
    .append('svg:rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('stroke', '#000')
    .attr('stroke-width', 3)
    .attr('fill', 'none')

function doSomething () {
  d3.select('#id6').attr('class', 'yay').attr('height', 2)
}

function populate () {
  // the letters and numbers bordering the actual board
  d3.json('js/chess/border.json', function (LoH) {
    LoH.forEach((cell) => {
      cell.x = cell.col * size
      cell.y = cell.row * size

      addCell(cell)
    })
  })
  let pieces = []
  // the actual playing board
  d3.json('js/chess/setup.json', function (LoH) {
    LoH.forEach((cell, i) => {
      cell.x = cell.col * size
      cell.y = cell.row * size
      cell.cx = cell.x + (size / 2)
      cell.cy = cell.y + (size / 2)

      addCell(cell)
      if (cell.piece.length > 0) {
        // addPiece(cell.piece, cell.cx, cell.cy)
        pieces.push(cell)
      }
      // Ok, finish w/ the cells. Now add the pieces...   ...I'm
      // not using any z-index controls, so add the pieces last so they are
      // 'on top' on each cell
      if (i == 63) {
        pieces.forEach((cell) => {
          addPiece(cell.piece, cell.cx, cell.cy)
        })
      }
    })
  })
}
populate()

function addPiece (pieceName, x, y) {
  console.log('pieceName: ' + pieceName + ' x ' + x + ' +    y ' + y)
  let r = size / 2
  let face = d3.select('#charts')
        .append('svg:g')
        .data([{
          'x': x,
          'y': y
        }]) // needed for dragging
        .attr('transform', 'translate(' + x + ',' + y + ')')
        .call(drag)

  let head = face.append('svg:circle')
        .attr('class', 'cssthing')
        .attr('fill', function (d) {
          return '#e0e0e0'
        })
        .attr('fill-opacity', 0.8)
        .attr('stroke', '#000')
        .attr('stroke-width', 4)
        .attr('r', r)

  let text = face.append('svg:text')
        .text(pieces[pieceName].unicode)
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

  let face = d3.select('#charts')
        .append('svg:g')
        .attr('transform', 'translate(' + x + ',' + y + ')')
  let head = face.append('svg:rect')
        .attr('id', obj.id)
        .attr('fill', obj.color)
        .attr('fill-opacity', 1.0)
        .attr('stroke-width', 4)
        .attr('width', size)
        .attr('height', size)

  let text = face.append('svg:text')
        .text(obj.i)
        .attr('transform', 'translate(' + [(size - 10) / 2, (size + 12) / 2] + ')')
        .attr('text-anchor', 'right')
        .attr('font-weight', 700)
        .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
}

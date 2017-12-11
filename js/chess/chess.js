    var drag = d3.behavior.drag()
        .on('drag', function (d, i) {
          d.x += d3.event.dx
          d.y += d3.event.dy
          d3.select(this).attr('transform', function (d, i) {
            return 'translate(' + [ d.x, d.y ] + ')'
          })
        })

    function piece_factory (classname, x, y, r) {
      var face = d3.select('#charts')
            .append('svg:g')
                .data([ {'x': x, 'y': y} ]) // needed for dragging
                .attr('transform', 'translate(' + x + ',' + y + ')')
                .call(drag)

      var head = face.append('svg:circle')
                .attr('class', 'cssthing')
                .attr('fill', function (d) { return '#e0e0e0' })
                .attr('fill-opacity', 0.8)
                .attr('stroke', '#000')
                .attr('stroke-width', 4)
                .attr('r', r)

      var text = face.append('svg:text')
            .text(BLACK_KING.unicode)
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

/// ////////////////////////

    function cell_factory (classname, x, y, width, height, id) {
      var face = d3.select('#charts')
            .append('svg:g')
                .attr('transform', 'translate(' + x + ',' + y + ')')

      var head = face.append('svg:rect')
  .attr('class', 'cssthing')
                .attr('id', id)

                              .attr('fill', function (d) { return '#e0e0e0' })
                .attr('fill-opacity', 0.8)
                .attr('stroke', '#000')
                .attr('stroke-width', 4)
                .attr('width', width)
                .attr('height', height)

      var text = face.append('svg:text')
            .text(id)
             .attr("y", ".5em")
            // .attr("transform", "translate(" + [0, 10] + ")")
            .attr('text-anchor', 'middle')
            .attr('font-weight', 700)
            .attr('font-family', 'Helvetica')
            .attr('fill', '#000')
            .attr('stroke', 'none')
            .attr('pointer-events', 'none')
    }

/// /////////////////////////
    var w = 800
    var h = 800
    var size = 50

    // setup svg canvas
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

    for (i = 0; i < 10; i++) {
      let x = Math.random() * w
      let y = Math.random() * h
      let width = size
      let height = size
      id = 'id' + i
      cell_factory('cell' + i, x, y, width, height, id)
    }

  // r = 100;
    for (i = 0; i < 3; i++) {
      let r = size / 2

      let x = Math.random() * w
      let y = Math.random() * h
      piece_factory('face' + i, x, y, r)
    }

    function doSomething () {
      d3.select('#id6').attr('class', 'yay').attr("height",2)
    }

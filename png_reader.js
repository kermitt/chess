
let raw = `1.d4 Nf6 2.c4 e6 3.Nf3 d5 4.Nc3 c6 5.e3 Nbd7 6.Bd3 Bb4 7.a3 Ba5 8.O-O O-O
9.Ne5 Nxe5 10.dxe5 dxc4 11.Bxc4 Nd7 12.f4 Qe7 13.b4 Bb6 14.Qb3 f6 15.Bxe6+ Kh8
16.Ne4 fxe5 17.Kh1 exf4 18.exf4 Nf6 19.Ng5 Ne4 20.Nf7+ Rxf7 21.Bxf7 Nf2+
22.Kg1 Nd3+ 23.Kh1 Qe2 24.Bb2 Bh3 25.Bxg7+ Kxg7 26.Bd5 cxd5 27.Qxd5 Kh8 28.Qg5 Bd4
29.gxh3 Rg8 30.Rae1 Nxe1  0-1`
let next = 0
let white_moves = []
let black_moves = []

function getPNGfile (raw) {
  white_moves = []
  black_moves = []

  let ary = raw.split(/\d+\./)
  ary.forEach((move, i) => {
    move = move.trim()
    if (move.length > 0) {
      let ary = move.split(' ')
      white_moves.push(ary[0])
      black_moves.push(ary[1])
    }
  })
  makeTable(white_moves, black_moves)
}

function makeTable () {
  let table = "<table border='1' class='forHumans'>"
  table += '<tr>'
  table += "<td><center><button onclick='nextMove();' class='forHumans'>Next</button></center></td>"
  table += "<td><center><button onclick='saveCurrentState();' class='forHumans'>Save</button></center></td>"
  table += "<td><center><button onclick='loadStateFromLocalStorage();' class='forHumans'>Load</button></center></td>"
  table += '</tr>'
  table += '<tr><th>Play</th><th>White</th><th>Black</th></tr>'
  let j = 0
  for (let i = 0; i < white_moves.length; i++) {
    table += "<td><center><button onclick='playUpTo(" + i + ");' class='forHumans'>" + i + '</button></center></td>'
    table += "<td><div id='m" + j + "' class='unvisited'>" + white_moves[i] + '</div></td>'
    j++
    table += "<td><div id='m" + j + "' class='unvisited'>" + black_moves[i] + '</div></td>'
    j++
    table += '</tr>'
  }
  table += '</table>'
  document.getElementById('png').innerHTML = table
}
function nextMove () {
  document.getElementById('m' + next).classList.add('active')
  next++
}

function saveCurrentState () {
  alert('TODO: Save state to local storage')
}

function loadStateFromLocalStorage () {
  alert('TODO: Retrieve state from local storage')
}
function playUpTo (move) {
  // TODO: RESET
  let n = white_moves.length + black_moves.length
  for (let i = 0; i < n; i++) {
    document.getElementById('m' + i).classList.remove('active')
  }
  next = 2 + move * 2
  for (let i = 0; i < next; i++) {
    document.getElementById('m' + i).classList.add('active')
  }
}

function png_main () {
  getPNGfile(raw)
  makeTable()
}

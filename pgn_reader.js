
let raw = `1.d4 Nf6 2.c4 e6 3.Nf3 d5 4.Nc3 c6 5.e3 Nbd7 6.Bd3 Bb4 7.a3 Ba5 8.O-O O-O
9.Ne5 Nxe5 10.dxe5 dxc4 11.Bxc4 Nd7 12.f4 Qe7 13.b4 Bb6 14.Qb3 f6 15.Bxe6+ Kh8
16.Ne4 fxe5 17.Kh1 exf4 18.exf4 Nf6 19.Ng5 Ne4 20.Nf7+ Rxf7 21.Bxf7 Nf2+
22.Kg1 Nd3+ 23.Kh1 Qe2 24.Bb2 Bh3 25.Bxg7+ Kxg7 26.Bd5 cxd5 27.Qxd5 Kh8 28.Qg5 Bd4
29.gxh3 Rg8 30.Rae1 Nxe1  0-1`
let next = 0
// let white_moves = []
// let black_moves = []
let moves = []
function move (i) {
  console.log(' | ' + i)
}

function getPGNfile (raw) {
  moves = []

  let ary = raw.split(/\d+\./)
  ary.forEach((move, i) => {
    move = move.trim()
    if (move.length > 0) {
      let ary = move.split(' ')
      moves.push(ary[0]) // white
      moves.push(ary[1]) // black
    }
  })
  makeTable()
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
  for (let i = 0; i < moves.length; i++) {
    table += "<td><center><button onclick='playUpTo(" + i + ");' class='forHumans'>" + i + '</button></center></td>'
    table += "<td><div id='m" + i + "' class='unvisited'>" + i + '|' + moves[i] + '</div></td>'
    i++
    table += "<td><div id='m" + i + "' class='unvisited'>" + i + '|' + moves[i] + '</div></td>'
    table += '</tr>'
  }
  table += '</table>'
  document.getElementById('pgn').innerHTML = table
}
function nextMove () {
  document.getElementById('m' + next).classList.add('active')
  move(next)
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
  for (let i = 0; i < moves.length; i++) {
    document.getElementById('m' + i).classList.remove('active')
  }
  next = move
  for (let i = 0; i < next; i++) {
    document.getElementById('m' + i).classList.add('active')
  }
}

function pgn_main () {
  getPGNfile(raw)
  makeTable()
}

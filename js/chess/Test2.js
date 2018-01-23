var pieces = require('./Models2.js').pieces

const setupTest = () => {
  console.log(JSON.stringify(pieces, null, 6))
  let expected = 32
  let count = 0
  for (let key in pieces) {
    count++
  }
  let isOk = expected == count
  verdict(isOk, 'Pieces have been setup')
}

// + ----------------------------------- +

function verdict (pass_or_fail, msg) {
  let result = pass_or_fail ? 'PASS' : 'FAIL'
  console.log(result + '\t' + msg)
}
function unroll (obj) {
  console.log(JSON.stringify(obj, null, 6))
}
function main () {
  setupTest()
}
main()

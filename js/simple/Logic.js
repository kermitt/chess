var Model = require('./Setup.js')

try {
  module.exports = {
    Pieces: Pieces,
    Board: Board
  }
} catch (ignore) {
  // Export for testing purposes, but not for Web stuff.
}

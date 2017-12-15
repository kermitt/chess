var Model = require('./Model.js');
var Pieces= new Model.Pieces();
var Board= new Model.Board();
var Moves= new Model.Moves();


// + ----------------------------------- + 


function log(pass_or_fail, msg ) { 
	let verdict = pass_or_fail ? "PASS" : "FAIL"
	console.log(verdict + "\t" + msg)
} 

function main() {

} 

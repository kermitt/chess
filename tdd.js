function getRowCol(candidate) {
    //"r2c6"
    let ary = candidate.split("c")
    let row = parseInt(ary[0].replace("r",""))
    let col = parseInt(ary[1])
    return [row,col]
}

function getIdTest() {
    let id = "r2c6"
    let rc = getRowCol(id)
    if ( rc[0] == 2 && rc[1] == 6 ) { 
        console.log("PASS")
    } else {
        console.log("FAIL " + JSON.stringify(rc))
 
    }

}
getIdTest()
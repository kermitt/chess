
/*
function writePng() { 
    //https://www.youtube.com/watch?v=t0QxRXbNu5E via agadmator
    let example = `1. e4 c5 2. Nf3 e6 3. d4 cd4 4. Nd4 Nc6 5. Nc3 Qc7 6. Be3 a6 7. Bd3 Nf6 8. O-O Bd6 9. Kh1 h5 10. f4 Ng4 11. Qf3 Ne3 12. Qe3 Qb6 13. Nce2 e5 14. Qg3 ed4 15. Qg7 Rf8 16. e5 Be7 17. f5 f6 18. Nf4 Rf7 19. ef6 Ne5 20. Bc4 Nc4 21. Qg8 Bf8 22. Nh5 Nd6 23. Rae1 Kd8 24. Re7 Qb5 25. Rfe1 Qd5 26. Nf4 Qa2 27. Ne6 Qe6 28. fe6 Rf6 29. Rf7`
    let out = "THIS IS JUST A DUMMY GAME - It does nothing.\n"
    let moves = example.split(/\d*\./) // e.g.,  10.
    moves.forEach((m,i)=> { 
      if ( m.length > 0 ) {
        let paddedCount = i < 10 ? " " + i : i 
        out += paddedCount + " | " + m + "\n"
      }
    })
    document.getElementById("pgn").value=out
  }
  writePng()
  */
 function writePng() { 
  /* 
  //https://www.youtube.com/watch?v=t0QxRXbNu5E via agadmator
    let example = `1. e4 c5 2. Nf3 e6 3. d4 cd4 4. Nd4 Nc6 5. Nc3 Qc7 6. Be3 a6 7. Bd3 Nf6 8. O-O Bd6 9. Kh1 h5 10. f4 Ng4 11. Qf3 Ne3 12. Qe3 Qb6 13. Nce2 e5 14. Qg3 ed4 15. Qg7 Rf8 16. e5 Be7 17. f5 f6 18. Nf4 Rf7 19. ef6 Ne5 20. Bc4 Nc4 21. Qg8 Bf8 22. Nh5 Nd6 23. Rae1 Kd8 24. Re7 Qb5 25. Rfe1 Qd5 26. Nf4 Qa2 27. Ne6 Qe6 28. fe6 Rf6 29. Rf7`
    let moves = example.split(/\d*\./) // e.g.,  10.
    let table = "<table border='1'>"
    moves.forEach((m,i)=> { 
      if ( m.length > 0 ) {
        table += "\n<tr>"
        m = m.trim()
        m = m.replace(" ",":")           
        if ( m.includes(":")) { 
            let ary = m.split(":")
            table += "<td>" + ary[0] + "</td>"
            table += "<td>" + ary[1] + "</td>"
        } else {
            table += "<td>" + m + "</td>"
            table += "<td></td>"
        }
        table += "</tr>"
      }
    })
    table += "</table>"

    document.getElementById("pgn").innerHTML=table
    */
  }
  writePng()
 
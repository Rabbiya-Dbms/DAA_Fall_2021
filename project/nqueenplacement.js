const constraint = (rows, col, sol) => {
    for (let i = 0; i < rows; i++) {
        if (sol[i] === col ||
            Math.abs(col - sol[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}

// Loop function from all col and rows

const allRows = (row, cols, lstSol) => {
    
    let latestSol = [];
    let prev = lstSol;

    for (let i = 0; i < prev.length; i++) {
        let sol = prev[i];
        // col loop
        for (let j = 0; j < cols; j++) {
            //possibility to place queen in j 
            if (constraint(row, j, sol)) {
                // if yes then place
                latestSol.push(sol.concat([j]));
            }
        }
    }
    if (row === cols - 1) {
        //console.log(row);
        result = latestSol;
        //console.log(result); 

    } else {
        // it cont to other rows
        allRows(row + 1, cols, latestSol);
    }
    return result;
};

//Function to run


const nqueenSol = (n) => {
    const init = [[]];
    const allSol = allRows(0, n, init);
    //console.log(allSol.length);
    return allSol;
}


// for chess board

const nqueen = {
    name: "nqueen",
    w: "\u2655",
    b: "\u265B"
};

// chess board drawing

const makeBoard = (n, allSol, ind) => {
    //create chess board
    //set board 
    const bSize = 100,
        b_dimension = n,
        board_size = b_dimension * bSize,
        margin = 100;
    // // solution get of nqueens
    // const nNqueens = nqueenSol(b_dimension);
    // set <body>
    const div = d3.select("#svg-container");

    // create <svg>
    const svg = div.append("svg")
        .attr("width", board_size + "px")
        .attr("height", board_size + "px");

    // chess board loop through cols and rows
    for (let i = 0; i < b_dimension; i++) {
        for (let j = 0; j < b_dimension; j++) {
            // board fields
            const box = svg.append("rect")
                .attr("x", i * bSize)
                .attr("y", j * bSize)
                .attr("width", bSize + "px")
                .attr("height", bSize + "px");
            if ((i + j) % 2 === 0) {
                box.attr("fill", "white");
            } else {
                box.attr("fill", "gray");
            }

            // draw players
            const chess = svg.append("text")
                .classed('draggable', true)
                .style("font-size", bSize*3/4)
                .attr("text-anchor", "middle")
                .attr("x", i * bSize)
                .attr("y", j * bSize)
                .attr("dx", bSize / 2)
                .attr("dy", bSize * 3 / 4)
                .style("text-shadow", "2px 2px 4px #757575");

            // chess.attr("X", chess.attr("x"))
            //   .attr("Y", chess.attr("y"));

            // create players
            if (j === allSol[ind][i]) {
                chess.attr("id", "b" + j + i)
                    .classed('team1', true)
                    .text(nqueen.b);
            }
        }
    }
}

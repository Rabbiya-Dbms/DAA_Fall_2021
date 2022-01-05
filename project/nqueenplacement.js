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
    w: "\u2000",
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
// by default
const init = () => {
    makeBoard(8, [[]], 0);
}
init();

//make board clear
const clear = () => {
    d3.select("svg").remove();
}

//DOM Selection here
//const btnGet = document.getElementById("btnGet");
const inputNum = document.getElementById("inputNum");
const instruction = document.getElementById("instruction");
const status = document.getElementById("status");
const title = document.getElementById("title");
let ind = 0; //ind to count sols when showing on chess boards


/**
 * Function here 
 */

const solGet = () => {
    n = parseInt(inputNum.value);
    if (Number.isNaN(n)) {
        instruction.innerHTML = "Please enter a number";
    }
    else if (n < 4 || n > 20) {
        instruction.innerHTML = "Please enter a number between 4 and 20";
    } else {
        clear();
        const allSol = nqueenSol(n);
        title.innerHTML = `Find sols for ${n} nqueens problem`
        instruction.innerHTML = "Click Next to see sols";
        status.innerHTML = `There are ${allSol.length} sols.`;
        return [n, allSol];
    }
}

//Solutions Sequence
const nextSol = () => {
    //console.log(ind);
    // get n and allSol   
    const vars = solGet();
    //console.log(vars[0]);
    //console.log(vars[1].length);
    //draw chess board with n nqueens
    makeBoard(vars[0], vars[1], ind);
    if (ind < vars[1].length - 1) {
        status.innerHTML = ` Solution ${ind + 1}`;
        ind++;
    } else {
        //console.log(ind);
        status.innerHTML = ` Solution ${ind + 1}. You reach the last solution limit!`;
        ind = 0;
    }
}

const theconst = (rows, col, sol) => {
    for (let i = 0; i < rows; i++) {
        if (sol[i] === col ||
            Math.abs(col - sol[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}

const allRows = (row, cols, prevStep) => {
    let newSols = [];
    let prev = prevStep;

    for (let i = 0; i < prev.length; i++) {
        let sol = prev[i];
      
        for (let j = 0; j < cols; j++) {
            
            if (theconst(row, j, sol)) {
             
                newSols.push(sol.concat([j]));
            }
        }
    }
    if (row === cols - 1) {
        
        result = newSols;
       

    } else {
       
        allRows(row + 1, cols, newSols);
    }
    return result;
};



const nnqueens_sol = (n) => {
    const init = [[]];
    const totalSols = allRows(0, n, init);
    return totalSols;
}

const nqueen = {
    name: "nqueen",
    w: "\u2655",
    b: "\u265B"
};

const board = (n, totalSols, ind) => {
 
    const size = 100,
        dimension = n,
        boardSize = dimension * size,
        margin = 100;
 
    const div = d3.select("#svg-container");

   
    const svg = div.append("svg")
        .attr("width", boardSize + "px")
        .attr("height", boardSize + "px");

  
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            
            const box = svg.append("rect")
                .attr("x", i * size)
                .attr("y", j * size)
                .attr("width", size + "px")
                .attr("height", size + "px");
            if ((i + j) % 2 === 0) {
                box.attr("fill", "beige");
            } else {
                box.attr("fill", "gray");
            }

             
            const chessBoard = svg.append("text")
                .classed('draggable', true)
                .style("font-size", size*3/4)
                .attr("text-anchor", "middle")
                .attr("x", i * size)
                .attr("y", j * size)
                .attr("dx", size / 2)
                .attr("dy", size * 3 / 4)
                .style("text-shadow", "2px 2px 4px #757575");

            
            if (j === totalSols[ind][i]) {
                chessBoard.attr("id", "b" + j + i)
                    .classed('team1', true)
                    .text(nqueen.b);
            }
        }
    }
}


const init = () => {
    board(8, [[]], 0);
}
init();


const clear = () => {
    d3.select("svg").remove();
}


const ip_num = document.getElementById("ip_num");
const inst = document.getElementById("inst");
const status = document.getElementById("status");
const main = document.getElementById("main");
let ind = 0; 

const getSol = () => {
    n = parse_int(ip_num.value);
    if (Number.isNaN(n)) {
        inst.innerHTML = "Please enter a number";
    }
    else if (n < 4 || n > 10) {
        inst.innerHTML = "Please enter a number between 4 and 10";
    } else {
        clear();
        const totalSols = nnqueens_sol(n);
        main.innerHTML = `Find sols for ${n} nqueens placement problem`
        inst.innerHTML = "Click Next to see further solutions";
        status.innerHTML = `There are ${totalSols.length} solutions.`;
        return [n, totalSols];
    }
}


const nextSol = () => {
      
    const varr = getSol();
    board(varr[0], varr[1], ind);
    if (ind < varr[1].length - 1) {
        status.innerHTML = ` Sol ${ind + 1}`;
        ind++;
    } else {
       
        status.innerHTML = ` Solution num ${ind + 1}. You reach the limit;
        ind = 0;
    }
}

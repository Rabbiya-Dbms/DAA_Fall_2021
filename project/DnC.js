// where DnC logic placed in our code:

 
//Execution Time: 0.093ms


console.time('Execution Time');
const allRows = (row, cols, lstSol) => {
    
    let latestSol = [];
    let prev = lstSol;

    for (let i = 0; i < prev.length; i++) {
        let sol = prev[i];
      
        for (let j = 0; j < cols; j++) {
           
            if (constraint(row, j, sol)) {
              
                latestSol.push(sol.concat([j]));
            }
        }
    }
    if (row === cols - 1) {
      
        result = latestSol;
  

    } else {
      
        allRows(row + 1, cols, latestSol);
    }
    return result;
};
console.timeEnd('Execution Time');

// We have discovered that:
//It's encouraging to learn that global constraints in a problem 
//that was previously considered to necessitate backtracking 
//(which is anathema to distributed and parallel systems) may be divisibleand-conquerable.

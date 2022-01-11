// where DP logic placed in our code:

//Constraints Function
// Each solution is a collection of variables in an array

//Execution Time: 0.099ms
console.time('Execution Time');
 
const Constraints = (rows, col, sol) => {
    for (let i = 0; i < rows; i++) {
        if (sol[i] === col ||
            Math.abs(col - sol[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}
console.timeEnd('Execution Time');

//Verification. Assume that S is the set of closed lines and that m is the number of queens put by C.
//Let C be the result of completing C. Because C and C both have the same number of queens,
//adjoining C to C will result in a candidate with n queens, according to assumption,
//C did not place a queen on any line in S?, which consisted of the closed lines in C. 
//As a result of adjoining C, completing C, to C, the result is a solution.

// What we discovered is that
//We have defined its 0 (f (n> 8n) algorithm
//problem n-queens. There is some evidence
//that number of solutions to the problem
//super-exponential . If this is true, then ours
//The algorithm is superior to any method (e.g.
//backtracking) clearly forms all problematic solutions.

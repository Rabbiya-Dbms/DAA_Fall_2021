// where DP logic placed in our code:

//Constraints Function
// Each solution is a collection of variables in an array
const Constraints = (rows, col, sol) => {
    for (let i = 0; i < rows; i++) {
        if (sol[i] === col ||
            Math.abs(col - sol[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}

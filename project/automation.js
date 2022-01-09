// nqueens animated view
let n = 4;
const colors = ["blue", "#35ADE5", "purple", "black", "#C922E7", "#9C27B0", "#009688", "#EE220D"];
let countCol = 0;
let rowCounts = 0;
let indSols = 0;
let newSols = [];
let lstSol = [];
let automatic = "";
const inp_num = document.getElementById("inp_num");
const status = document.getElementById("status");
let steps = 0;
//by-default
const init = () => {
  makeBoard(n, [[]], 0);
}
init();

// each step animation
 
const StepNext = () => {
  steps++;
  //checking all cols end up
  if (countCol === n) {
    //finish checking all sols from previous row   
    if (indSols === lstSol.length - 1) {
      lstSol = newSols.slice();
      newSols = [];
      rowCounts++;
      countCol = 0;
      indSols = 0;
      if (rowCounts === n) { // checing last row
        status.innerHTML = `There are total  ${lstSol.length} sols. There are ${steps} steps.`;
        // map all chess solutions
        for (let i = 0; i < lstSol.length; i++) {
          makeBoard(n, lstSol, i);
        }
      };

      // here hide all solutions
      for (let i = 0; i <= rowCounts; i++) {
        d3.selectAll(".nqueens" + i).attr("visibility", "hidden");
      }
    } else { //check other col's not last yet
      if (rowCounts > 0) {
        // move forward to the next row 
        rowCounts--;
        indSols++;
        d3.select("#b" + rowCounts + indSols).attr("visibility", "visible");
        countCol = 0;
        rowCounts++;
      }
    } // else ends here

    if (rowCounts === 0) {
      countCol = 0;
      d3.selectAll(".nqueens" + rowCounts).attr("visibility", "hidden");
      d3.select("#b" + rowCounts + countCol).attr("visibility", "visible");
      rowCounts++;
      lstSol = newSols.slice();
      newSols = [];
    }
  } end check of countCol === n

  // except 1st check all rows
  if (rowCounts > 0 && rowCounts < n && countCol <= n) {
    //hide all <text> in previous rows
    for (let i = 0; i <= rowCounts; i++) {
      d3.selectAll(".nqueens" + i).attr("visibility", "hidden");
    }
    let sol = lstSol[indSols];
    status.innerHTML = `Check row ${rowCounts} and col  ${countCol} when nqueens are placed previously at [${sol}]. `;
    //display sol
    for (let i = 0; i < sol.length; i++) {
      let solQ = d3.select("#b" + i + sol[i]).text(nqueen.b).datum(colors[sol[0]]).attr("fill", function (d) {
        return d;
      }).attr("visibility", "visible");
    }
    //to check constraints
    let selectedQ = d3.select("#b" + rowCounts + countCol);
    if (constraint(rowCounts, countCol, sol)) { //pacing queens
      newSols.push(sol.concat([countCol]));
      selectedQ.classed("nqueens" + rowCounts, true).text(nqueen.b).datum(colors[sol[0]]).attr("fill", function (d) {
        return d;
      });
      status.innerHTML += `Store accepted sol [${sol.concat([countCol])}]`;
    } else { //placing X
      selectedQ.classed("nqueens" + rowCounts, true).text("X").datum(colors[sol[0]]).attr("fill", function (d) {
        return d;
      });
    }
    selectedQ.attr("visibility", "visible");
    countCol++;
  }
  // first row
  if (rowCounts === 0 && countCol < n) {
    let sol = [];
    status.innerHTML = `Check row ${rowCounts} and col  ${countCol}. `;
    let selectedQ = d3.select("#b" + rowCounts + countCol);
    selectedQ.classed("nqueens" + rowCounts, true).text(nqueen.b).datum(colors[countCol]).attr("fill", function (d) {
      return d;
    });
    //Constraints and stores solutions checked
    if (constraint(rowCounts, countCol, sol)) {
      // place nqueen at j
      newSols.push(sol.concat([countCol]));
      status.innerHTML += `Store accepted sol [${sol.concat([countCol])}]`;
    }
    countCol++;
  }
}

// AUTO RUN

const automationView = () => {
  // to stop it
  automatic = setInterval(StepNext, 100);
}

// stopping animated view

const stopFun = () => {
  // stop automatic view
  clearInterval(automatic);
  // clear the board and place again
  d3.selectAll("svg").remove();
  makeBoard(n, [[]], 0);
  status.innerHTML = "You stop the animation";
  // var reassining
  countCol = 0;
  rowCounts = 0;
  indSols = 0;
  newSols = [];
  lstSol = [];
  steps = 0;
}

// get btn
 
const getOnClick = () => {
 
  n = parseInt(inp_num.value);
  if (Number.isNaN(n)) {
    status.innerHTML = "Please enter a number";
  }
  else if (n < 4 || n > 10) {
    status.innerHTML = "Please enter a number between 4 and 8";
  }
  else {
    stopFun();
    status.innerHTML = `The chess board size is now ${n}`;
  }
}

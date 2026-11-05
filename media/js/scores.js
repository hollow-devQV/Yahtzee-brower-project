import * as C from "./const.js";
import { reset, isFullyFilled, declareWinner } from "./game.js";

export function countDice(pointer){
  
  


  if(pointer.classList.contains("used")){
    alert("sorry, a value has already been given to this pointer, try a different one.")
    return
  }
  

  
  
  
  if(C.results.length == 0) return;
  let total = 0;
  const info = pointer.getAttribute("data-index");
  
  pointer.classList.add("used");


  if(info.length == 1){
    C.results.forEach(value => {
      if (value == parseInt(info)){
        total += value;
      }
    })
  } else {
    total = checkForScore(C.results, info);
    
  }
  
  pointer.textContent = total;
  C.players[C.state.currentPlayer].scores[info] = total;


  let scoreFilled = document.querySelectorAll(".points-select.used").length;
  
  const player1Scores = Object.values(C.players[0].scores);
  const player2Scores = Object.values(C.players[1].scores);

  console.log(player2Scores);

  if(scoreFilled == 13 && C.players.length == 1){
    C.newGameBtn.style.display = "flex"
  } else if(isFullyFilled(player1Scores) && isFullyFilled(player2Scores)){
    declareWinner();

  } else {
    reset();
  }

}



function checkForScore(results, check){
  let count = [0,0,0,0,0,0];
  let total = 0;
  let i = 1;
  C.results.forEach(value => {
    count[value -1] += 1;
  })


  switch(check){
    case "3-row":
      count.forEach(counts => {
        if(counts >= 3){
          total = i * 3;
        }
        i++;
      })
      break;
    case "4-row":
      count.forEach(counts => {
        if(counts >= 4){
          total = i * 4;
        }
        i++;
      })
      break;
    case "2-3":

      if(count.includes(3) && count.includes(2)){
          total = 25
        }
      break;
    case "s-straight":
      if (hasRun(count, 0, 4) || hasRun(count, 1, 4) || hasRun(count, 2, 4)) {
        return 30;
      }
      break;
    case "l-straight":
      if (hasRun(count, 0, 5) || hasRun(count, 1, 5) || hasRun(count, 2, 5)) {
        return 40;
      }
      break;
    case "5-row":
      count.forEach(counts => {
        if(counts == 5){
          total = 50;
        }
        i++;
      })
      break;
    case "random":
      C.results.forEach(number => {
        total += parseInt(number);
      })
      break;
  }

  return total;
}

function hasRun(count, start, length) {
  return count.slice(start, start + length).every(amount => amount >= 1);
}

export function updateTotals(player){
  const scores = player.scores;

  Object.entries(scores).forEach(([category, score]) => {
  const pointer = document.querySelector(`.points-select[data-index="${category}"]`);
  if (score === null) {
    pointer.textContent = "";
    pointer.classList.remove("used");
  } else {
    pointer.textContent = score;
    pointer.classList.add("used");
  }
});

  const top = sumCategories(player.scores, C.UPPER);
  const bonus = top >= 63 ? 35 : 0;
  const bottom = sumCategories(player.scores, C.LOWER);
  


  C.bonusText.textContent = bonus;
  C.totalHigher.textContent = top;
  C.totalLower.textContent = bottom;
  C.totalGrand.textContent = top + bonus + bottom
  
}

function sumCategories(scores, categories) {
  return categories.reduce((sum, key) => sum + (scores[key] ?? 0), 0);
}


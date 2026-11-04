import * as C from "./const.js";
import { reset } from "./game.js";

export function countDice(pointer){
  console.log(C.state.currentPlayer, typeof C.state.currentPlayer);
  pointer.classList.add("used");
  
  if(C.results.length == 0) return;
  let total = 0;
  const info = pointer.getAttribute("data-index");
  if(info.length == 1){
    C.results.forEach(value => {
      if (value == parseInt(info)){
        total += value;
      }
    })
    pointer.textContent = total;
    C.players[C.state.currentPlayer].scores[info] = total;
  } else {
    const score = checkForScore(C.results, info);
    pointer.textContent = score;
    C.players[C.state.currentPlayer].scores[info] = score;
  }
  let scoreFilled = document.querySelectorAll(".points-select.used").length;
  
  if(scoreFilled == 13){
    C.newGameBtn.style.display = "flex"
  } else{
    reset();
  }
  console.log(JSON.stringify(C.players));
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
        total += number;
      })
      break;
  }

  return total;
}

function hasRun(count, start, length) {
  return count.slice(start, start + length).every(amount => amount >= 1);
}

export function updateTotals(){
  let totalTop = 0;
  let totalBot = 0;
  C.upperPointers.forEach(pointer => {
    if(pointer.textContent == ""){
      return;
    }
    totalTop += parseInt(pointer.textContent); 
  })

  C.lowerPointers.forEach(pointer => {
    if(pointer.textContent == ""){
      return;
    }
    totalBot += parseInt(pointer.textContent); 
  })

  if(totalTop >= 63){
    C.bonusText.innerHTML = 35;
  } else {
    C.bonusText.innerHTML = 0;
  }


  C.totalHigher.innerHTML = totalTop + parseInt(C.bonusText.textContent);
  C.totalLower.innerHTML = totalBot;
  C.totalGrand.innerHTML = totalTop + parseInt(C.bonusText.textContent) + totalBot;
}
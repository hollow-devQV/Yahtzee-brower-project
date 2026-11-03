import * as C from "./const.js";
import { updateTotals } from "./scores.js";

export function reset(){
  
  C.state.rolls = 3;
  
  updateRolls();
  C.btn.disabled = false;
  updateTotals();
  C.el.forEach(dice => {
    const position = dice.getAttribute("data-index");
    const numberPosition = document.getElementById("dice-roll-"+ (parseInt(position) + 1) +"-locked");
    numberPosition.innerHTML = "0"
    if(dice.classList.contains("locked")){
      dice.classList.remove("locked");
    }
  })
  C.results.length = 0;
}

export function newGame(){
  C.pointsSelect.forEach(used => {
    used.classList.remove("used")
    used.innerHTML = "";
  })
  C.bonusText.innerHTML = "";
  C.totalLower.innerHTML = "";
  C.totalHigher.innerHTML = "";
  updateTotals();
  reset();
  C.newGameBtn.style.display = "none";
}

export function quitGame(){
  newGame();
  C.welcomeScreen.classList.add("screen-showing");
  C.welcomeScreen.classList.remove("screen-gone");
  C.gameScreen.classList.remove("screen-showing");
  C.gameScreen.classList.add("screen-gone");
  C.gameScreen.style.display = "flex";
  
}

export function updateRolls(){
  C.rollsLeft.innerHTML = C.state.rolls;
}
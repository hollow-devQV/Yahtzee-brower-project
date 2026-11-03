import * as C from "./const.js";
import { updateRolls } from "./game.js";


export function rollDice() {
  if (C.state.isRolling) return;
  if(C.state.rolls == 0){
    C.btn.disabled = true;
    return;
  }
  C.state.isRolling = true;
  C.btn.disabled = true;
  C.state.rolls--;
  updateRolls();

    C.el.forEach((dice, i) => {

      if (dice.classList.contains("locked")){
        return
      }
      
      const value = Math.floor(Math.random() * 6) + 1;
      C.results[i] = value;

      dice.classList.add('rolling');
    const timer = setInterval(() => {
      dice.textContent = C.faces[Math.floor(Math.random() * 6)];
    }, 70);

    // elke dobbelsteen stopt iets later dan de vorige
    setTimeout(() => {
      clearInterval(timer);
      dice.textContent = C.faces[value - 1];
      dice.classList.remove('rolling');
    }, 600 + i * 200);
    })

    setTimeout(() => {
    C.state.isRolling = false;
    C.btn.disabled = C.state.rolls === 0;
    // hier later: updateScores();
  }, 600 + (C.el.length - 1) * 200 + 50);
  
}

export function lockDice(dice){
  if (C.results.length === 0) return;
  if (C.state.isRolling) return; 

  const position = dice.getAttribute("data-index");
  const numberPosition = document.getElementById("dice-roll-"+ (parseInt(position) + 1) +"-locked");
  
  
  if (dice.classList.contains("locked")) {
    dice.classList.remove("locked");
    numberPosition.innerHTML = "0";
  } else {
    dice.classList.add("locked");
    numberPosition.innerHTML = C.results[position];
  }
}
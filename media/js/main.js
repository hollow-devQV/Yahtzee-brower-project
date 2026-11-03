import * as C from "./const.js";
import { lockDice, rollDice } from "./dice.js";
import { newGame, quitGame, updateRolls } from "./game.js";
import { screenSwitch } from "./screens.js";
import { countDice } from "./scores.js";


function init(){
    C.pointsSelect.forEach(pointer => {
    pointer.addEventListener("click", () => {
      countDice(pointer);
    })
  })
  C.el.forEach(dice => {
    dice.addEventListener("click", () => {
      lockDice(dice);
    })
  })

  updateRolls();
  C.newGameBtn.addEventListener("click", newGame)
  C.soloBtn.addEventListener("click", screenSwitch);
}

init();
C.btn.addEventListener('click', rollDice);
C.quit.addEventListener('click', quitGame);
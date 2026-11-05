import * as C from "./const.js";
import { updateTotals } from "./scores.js";

export function reset(){
  C.state.currentPlayer = (C.state.currentPlayer + 1) % C.players.length;
  switchPlayerVisual();


  C.state.rolls = 3;
  
  updateRolls();
  C.btn.disabled = false;
  updateTotals(C.players[C.state.currentPlayer]);
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
  updateTotals(C.players[C.state.currentPlayer]);
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

export function createPlayer(name, type) {
  const scores = {};
  [...C.UPPER, ...C.LOWER].forEach(category => {
    scores[category] = null;   // null = nog niet gebruikt
  });
  return { name, type, scores };
}

export function switchPlayerVisual(){
  
  if(C.state.currentPlayer === 0){
    C.scoreBoard.classList.remove("turn-enemy");
    C.scoreBoard.classList.add("turn-you");
  } else {
    C.scoreBoard.classList.add("turn-enemy");
    C.scoreBoard.classList.remove("turn-you");
  }

  switchCssPlayer();

}

export function switchCssPlayer(){
  if(C.state.currentPlayer == 0){
    C.player2.classList.remove("selected");
    C.player1.classList.add("selected");
  } else {
    C.player2.classList.add("selected");
    C.player1.classList.remove("selected");
  }
}

export function isFullyFilled(array){
  console.log(array);
  let filled = 0;
  array.forEach(value => {
    if(value === null) return;
    filled++;
  })
  if(filled === 13) return true;
}

export function declareWinner(){
  updateTotals(C.players[0]);
  const totals1 = C.totalGrand.textContent;
  updateTotals(C.players[1]);
  const totals2 = C.totalGrand.textContent;

  console.log(totals1)
  console.log(totals2)

  if(totals1 > totals2){
    alert("YOU WIN!")
  } else {
    alert("ENEMY WON!")
  }
}
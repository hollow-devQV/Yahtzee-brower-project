const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const btn = document.getElementById('roll-btn');
const quit = document.getElementById('quit-game')
const results = [];
const el = document.querySelectorAll(".active-dice");
const pointsSelect = document.querySelectorAll(".points-select");
const lockedAll = document.querySelectorAll(".locked-status");
let isRolling = false;
let rolls = 3;
const rollsLeft = document.getElementById("rolls-left");
const upperPointers = document.querySelectorAll(".upper-section .points-select");
const lowerPointers = document.querySelectorAll(".lower-section .points-select");
const totalHigher = document.getElementById("higher-section-total-points");
const totalLower = document.getElementById("lower-section-total-points");
const totalGrand = document.getElementById("grand-section-total-points");
const bonusText = document.getElementById("bonus");
const newGameBtn = document.getElementById("newgamebtn");


const welcomeScreen = document.querySelector(".welcome-screen");
const gameScreen = document.querySelector(".gameplay");


function init(){
    pointsSelect.forEach(pointer => {
    pointer.addEventListener("click", () => {
      countDice(pointer);
    })
  })
  el.forEach(dice => {
    dice.addEventListener("click", () => {
      lockDice(dice);
    })
  })

  updateRolls();
  newGameBtn.addEventListener("click", newGame)
}

function reset(){
  
  rolls = 3;
  
  updateRolls();
  btn.disabled = false;
  updateTotals();
  el.forEach(dice => {
    const position = dice.getAttribute("data-index");
    const numberPosition = document.getElementById("dice-roll-"+ (parseInt(position) + 1) +"-locked");
    numberPosition.innerHTML = "0"
    if(dice.classList.contains("locked")){
      dice.classList.remove("locked");
    }
  })
  results.length = 0;
}

function updateRolls(){
  rollsLeft.innerHTML = rolls;
}

function rollDice() {
  if (isRolling) return;
  if(rolls == 0){
    btn.disabled = true;
    return;
  }
  isRolling = true;
  btn.disabled = true;
  rolls--;
  updateRolls();

    el.forEach((dice, i) => {

      if (dice.classList.contains("locked")){
        return
      }
      
      const value = Math.floor(Math.random() * 6) + 1;
      results[i] = value;

      dice.classList.add('rolling');
    const timer = setInterval(() => {
      dice.textContent = faces[Math.floor(Math.random() * 6)];
    }, 70);

    // elke dobbelsteen stopt iets later dan de vorige
    setTimeout(() => {
      clearInterval(timer);
      dice.textContent = faces[value - 1];
      dice.classList.remove('rolling');
    }, 600 + i * 200);
    })

    setTimeout(() => {
    isRolling = false;
    btn.disabled = rolls === 0;
    // hier later: updateScores();
  }, 600 + (el.length - 1) * 200 + 50);
  
}



function countDice(pointer){
  pointer.classList.add("used");
  
  if(results.length == 0) return;
  let total = 0;
  const info = pointer.getAttribute("data-index");
  if(info.length == 1){
    results.forEach(value => {
      if (value == parseInt(info)){
        total += value;
      }
    })
    pointer.innerHTML = total;
  } else {
    const score = checkForScore(results, info);
    pointer.innerHTML = score;
  }
  let scoreFilled = document.querySelectorAll(".points-select.used").length;
  
  if(scoreFilled == 13){
    newGameBtn.style.display = "flex"
  } else{
    reset();
  }
  
}

function lockDice(dice){
  if (results.length === 0) return;
  if (isRolling) return; 

  const position = dice.getAttribute("data-index");
  const numberPosition = document.getElementById("dice-roll-"+ (parseInt(position) + 1) +"-locked");
  
  
  if (dice.classList.contains("locked")) {
    dice.classList.remove("locked");
    numberPosition.innerHTML = "0";
  } else {
    dice.classList.add("locked");
    numberPosition.innerHTML = results[position];
  }
}

function checkForScore(results, check){
  let count = [0,0,0,0,0,0];
  let total = 0;
  let i = 1;
  results.forEach(value => {
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
      results.forEach(number => {
        total += number;
      })
      break;
  }

  return total;
}

function hasRun(count, start, length) {
  return count.slice(start, start + length).every(amount => amount >= 1);
}

function updateTotals(){
  let totalTop = 0;
  let totalBot = 0;
  upperPointers.forEach(pointer => {
    if(pointer.textContent == ""){
      return;
    }
    totalTop += parseInt(pointer.textContent); 
  })

  lowerPointers.forEach(pointer => {
    if(pointer.textContent == ""){
      return;
    }
    totalBot += parseInt(pointer.textContent); 
  })

  if(totalTop >= 63){
    bonusText.innerHTML = 35;
  } else {
    bonusText.innerHTML = 0;
  }


  totalHigher.innerHTML = totalTop + parseInt(bonusText.textContent);
  totalLower.innerHTML = totalBot;
  totalGrand.innerHTML = totalTop + parseInt(bonusText.textContent) + totalBot;
}


function newGame(){
  pointsSelect.forEach(used => {
    used.classList.remove("used")
    used.innerHTML = "";
  })
  bonusText.innerHTML = "";
  totalLower.innerHTML = "";
  totalHigher.innerHTML = "";
  updateTotals();
  reset();
  newGameBtn.style.display = "none";
}

function screenSwitch(){
  welcomeScreen.classList.remove("screen-showing");
  welcomeScreen.classList.add("screen-gone");
  gameScreen.classList.add("screen-showing");
  gameScreen.classList.remove("screen-gone");
  gameScreen.style.display = "flex";
}

function quitgame(){
  welcomeScreen.classList.add("screen-showing");
  welcomeScreen.classList.remove("screen-gone");
  gameScreen.classList.remove("screen-showing");
  gameScreen.classList.add("screen-gone");
  gameScreen.style.display = "none";
  
}

init();
btn.addEventListener('click', rollDice);
quit.addEventListener('click', quitgame);
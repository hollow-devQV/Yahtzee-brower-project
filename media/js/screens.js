import * as C from "./const.js";
import {createPlayer, switchPlayerVisual} from "./game.js";

export function screenSwitch(mode){
  C.players.length = 0;
  switch(mode.getAttribute("data-index")){
    case "solo":
      C.players.push(createPlayer("You", "Human"));
      C.player1.style.display = "block";
      break;

    case "cpu":
      C.players.push(createPlayer("You", "Human"));
      C.players.push(createPlayer("CPU", "Computer"));
      C.playerColumns.forEach(player => {
        player.style.display = "block";
      })
      break;

    case"local":
      C.players.push(createPlayer("You", "Human"));
      C.players.push(createPlayer("Friend", "Human"));
       C.playerColumns.forEach(player => {
        player.style.display = "block";
      })
      break;

    case"online":
      C.players.push(createPlayer("You", "Human"));
      C.players.push(createPlayer("Enemy", "Human"));
       C.playerColumns.forEach(player => {
        player.style.display = "block";
      })
      break;
  }

    switchPlayerVisual();

  C.welcomeScreen.classList.remove("screen-showing");
  C.welcomeScreen.classList.add("screen-gone");
  C.gameScreen.classList.add("screen-showing");
  C.gameScreen.classList.remove("screen-gone");
  C.gameScreen.style.display = "flex";
}


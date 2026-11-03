import * as C from "./const.js";

export function screenSwitch(){
  C.welcomeScreen.classList.remove("screen-showing");
  C.welcomeScreen.classList.add("screen-gone");
  C.gameScreen.classList.add("screen-showing");
  C.gameScreen.classList.remove("screen-gone");
  C.gameScreen.style.display = "flex";
}